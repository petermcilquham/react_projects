import type { Goal, Poison } from "~/screens/WorkoutApp";
import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier"

type Exercise = {
    meta: {
        environment: string;
    };
    muscles: string[];
    type: "compound" | "accessory";
    unit: "reps" | string;
};
type Exercises = Record<string, Exercise>;
const exercises: Exercises = exercisesFlattener(EXERCISES);

export function generateWorkout(poison:Poison["poisons"], muscles:string[], goal:Goal["goals"] ) {
    let exer: string[] = Object.keys(exercises);
    exer = exer.filter((key) => exercises[key].meta.environment !== "home");
    let includedTracker: string[] = [];
    let listOfMuscles: string[];

    if (poison === "individual") {
        listOfMuscles = muscles;
    } else {
        listOfMuscles = [""];
        if(poison === "bro_split"){
            listOfMuscles=WORKOUTS["bro_split"].push;
        }
        if(poison === "bodybuilder_split"){
            listOfMuscles=WORKOUTS["bodybuilder_split"].chest;
        }
        if(poison === "upper_lower"){
            listOfMuscles=WORKOUTS["upper_lower"].upper;
        } 
    }

    let musclesSet = new Set(shuffleArray(listOfMuscles));
    let arrOfMuscles = Array.from(musclesSet);
    let scheme = goal
    let sets: { setType: string; muscleGroup: string }[] = SCHEMES[scheme].ratio
        .reduce<any[]>((acc, curr:any, index) => {
            return [
                ...acc,
                ...[...Array(parseInt(curr)).keys()].map((val) =>
                    index === 0 ? "compound" : "accessory"
                ),
            ];
        }, [])
        .reduce((acc, curr, index) => {
            const muscleGroupToUse =
                index < arrOfMuscles.length
                    ? arrOfMuscles[index]
                    : arrOfMuscles[index % arrOfMuscles.length];
            return [
                ...acc,
                {
                    setType: curr,
                    muscleGroup: muscleGroupToUse,
                },
            ];
        }, []);

    const { compound: compoundExercises, accessory: accessoryExercises } =
        exer.reduce<any>(
            (acc, curr) => {
                let exerciseHasRequiredMuscle = false;
                for (const musc of exercises[curr].muscles) {
                    if (musclesSet.has(musc)) {
                        exerciseHasRequiredMuscle = true;
                    }
                }
                return exerciseHasRequiredMuscle
                    ? {
                        ...acc,
                        [exercises[curr].type]: {
                            ...acc[exercises[curr].type],
                            [curr]: exercises[curr],
                        },
                    }
                    : acc;
            },
            { compound: {}, accessory: {} }
        );

    const genWOD = sets.map(({ setType, muscleGroup }) => {
        const data =
            setType === "compound" ? compoundExercises : accessoryExercises;
        const filteredObj = Object.keys(data).reduce<Exercises>((acc, curr) => {
            if (
                includedTracker.includes(curr) ||
                !data[curr].muscles.includes(muscleGroup)
            ) {
                return acc;
            }
            return { ...acc, [curr]: exercises[curr] };
        }, {});
        
        const filteredDataList = Object.keys(filteredObj);
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryExercises : compoundExercises
        ).filter((val) => !includedTracker.includes(val));

        let randomExercise =
            filteredDataList[
            Math.floor(Math.random() * filteredDataList.length)
            ] ||
            filteredOppList[
            Math.floor(Math.random() * filteredOppList.length)
            ];

        if (!randomExercise) {
            return {};
        }

        let repsOrDuration:
          | number 
          | undefined =
          exercises[randomExercise].unit === "reps"
              ? Math.min(...SCHEMES[scheme].repRanges) +
              Math.floor(
                  Math.random() *
                  (Math.max(...SCHEMES[scheme].repRanges) -
                      Math.min(...SCHEMES[scheme].repRanges))
              ) +
              (setType === "accessory" ? 4 : 0)
              : Math.floor(Math.random() * 40) + 20;

        const tempo:string= TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

        if (exercises[randomExercise].unit === "reps") {
            const tempoSum:number= tempo
                .split(" ")
                .reduce((acc:number, curr:string) => acc + parseInt(curr), 0);
                
             if (tempoSum * parseInt(repsOrDuration as unknown as string)> 85) {
                 repsOrDuration= Math.floor(85 / tempoSum);
             }
         } else {
             repsOrDuration= Math.ceil(parseInt(repsOrDuration as unknown as string)/ 5)* 5;
         }
         
         includedTracker.push(randomExercise);

         return {
             name: randomExercise,
             tempo,
             rest:
                 SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
             reps:
                 repsOrDuration,
             ...exercises[randomExercise],
         };
     });

     return genWOD.filter(
         (element:any) => Object.keys(element).length > 0
     );
}

function shuffleArray(array: string[]): string[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        let j: number = Math.floor(Math.random() * (i + 1));
        let temp: string = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
// function shuffleArray(array: any[]): any[] {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         let temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array;
// }

function exercisesFlattener(exercisesObj: Record<string, any>): Record<string, any> {
    const flattenedObj: Record<string, any> = {}
  
    for (const [key, val] of Object.entries(exercisesObj)) {
      if (!("variants" in val)) {
        flattenedObj[key] = val
      } else {
        for (const variant in val.variants) {
          const variantName: string = variant + "_" + key
  
          const variantSubstitutes: string[] = Object.keys(val.variants)
            .map((element: string) => element + ' ' + key)
            .filter(element => element.replaceAll(' ', '_') !== variantName)
  
          flattenedObj[variantName] = {
            ...val,
            description: val.description + '___' + val.variants[variant],
            substitutes: [
              ...val.substitutes,
              ...variantSubstitutes
            ].slice(0, 5)
          }
        }
      }
    }
  
    return flattenedObj
  }