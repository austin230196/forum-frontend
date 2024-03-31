export default function(oldState: object, newState: object){
    return {
        ...oldState,
        ...newState
    }
}