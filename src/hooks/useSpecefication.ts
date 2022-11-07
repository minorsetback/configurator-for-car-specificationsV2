//React
import { useDispatch, useSelector } from 'react-redux';
import { specificationActions } from '../bus/specification/actions';
import { StringMap } from '../utility/types'
export const useSpecefication = () => {
    const dispatch = useDispatch();

    const setSpecification = (data: StringMap) => {
        dispatch(specificationActions.setSpecification(data))
    }

    const editSpecification = (id: string, data: StringMap) => {
        dispatch(specificationActions.editSpecification(id, data))
    }

    const specification = useSelector((state: any) => state.specification.specification);

    return {
        specification,
        setSpecification,
        editSpecification
    }
}