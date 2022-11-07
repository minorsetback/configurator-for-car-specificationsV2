// types 
import { types } from './types';
import { v4 as uuidv4 } from 'uuid';
import { StringMap } from "../../utility/types"

const initialState = {
    specification: []
}

export const specificationReducer = (state = initialState, { type, payload }: { type: string, payload: { id: string, data: StringMap } }) => {
    switch (type) {
        case types.SET_NEW_SPECEFICATION:
            return {
                ...state,
                specification: [...state.specification, { ...payload.data, id: uuidv4() }]
            }
        case types.EDIT_SPECEFICATION:
            return {
                ...state,
                specification: state.specification.map((item: StringMap) => item.id === payload.id ? { ...payload.data, id: payload.id } : item)
            }
        default:
            return state
    }
}