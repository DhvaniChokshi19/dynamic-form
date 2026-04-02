import { useReducer, useEffect } from "react";

const STORAGE_KEY= "dynamic_form_data_v1"
function formReducer(state, action){
    switch(action.type){
        case "SET_FIELD":
            return {
                ...state,
                values: {...state.values, [action.name]: action.value},
                errors: {...state.errors, [action.name]: ""}
            };
        case "SET_ERRORS":
            return {
                ...state,
                errors: action.errors
            };
        case "SET_SUBMITTED":
            return {
                ...state,
                submitted: action.value
            };
        case "RESET":
            return {
                values: {},
                errors: {},
                submitted: false
            };
        default:
            return state;
        }
}
function getInitialState(){
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if(saved)
            return{
        ...JSON.parse(saved),
        errors: {},
        submitted: false
            };
    } catch (error) {
        console.error("Failed to load form state:", error);
    }
    return {
            values: {},
            errors: {},
            submitted: false
        };
}

export default function useFormState() {
  const [state, dispatch] = useReducer(formReducer, {}, getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ values: state.values })
      );
    } catch (error) {
      console.error("Failed to save form state:", error);
    }
  }, [state.values]);
  return { state, dispatch };
}