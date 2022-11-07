//Types
import { types } from './types';
import { StringMap } from "../../utility/types"

export const specificationActions = Object.freeze({
    setSpecification: (data: StringMap) => {
        return {
            type: types.SET_NEW_SPECEFICATION,
            payload: { data }
        }
    },
    editSpecification: (id: string, data: StringMap) => {
        return {
            type: types.EDIT_SPECEFICATION,
            payload: { id: id, data: data }
        }
    }
})