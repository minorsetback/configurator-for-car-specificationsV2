import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { engine, material, wheel, wheelMaterial } from "../utility/options"
import Box from '@mui/material/Box';
import { Controller, useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useSpecefication } from '../hooks/useSpecefication';
import Modal from '@mui/material/Modal';
import { typeOptions } from "../utility/options"
import { useState, useEffect, FC } from "react"
import { Config, StringMap } from '../utility/types';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SpecificationForm: FC<{ activeSpecificationId: string }> = ({ activeSpecificationId }) => {
    const [initialValues, setInitialValues] = useState({
        air_suspension: false,
        color: "#000000",
        engine: "v4, petrol",
        material: "plastic",
        name: "",
        signature: "",
        wheel: "15 radius",
        wheel_type: "Alloy Wheels",
    })

    const { specification, setSpecification, editSpecification } = useSpecefication();
    const { reset, register, handleSubmit, control } = useForm<StringMap>({ defaultValues: initialValues });
    const [newConfigOption, setNewConfigOption] = useState<Array<Config>>([])
    const [type, setType] = useState<string>('text')
    const [name, setName] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const objectNewConfigOption = newConfigOption.reduce((obj, item) => Object.assign(obj, { [item.name]: '' }), {});
        setInitialValues({ ...initialValues, ...objectNewConfigOption })
        // eslint-disable-next-line
    }, [newConfigOption])

    const onSubmit = (data: StringMap) => {
        if (activeSpecificationId) {
            editSpecification(activeSpecificationId, data)
        } else {
            setSpecification(data)
        }
    }

    useEffect(() => {
        if (activeSpecificationId === '') {
            reset(initialValues)
        } else {
            const filtredSpecification = specification.filter((item: StringMap) => item.id === activeSpecificationId)
            reset({ ...initialValues, ...filtredSpecification[0] })
        }
        // eslint-disable-next-line
    }, [activeSpecificationId])

    return (
        <Box
            sx={{
                display: 'block',
                m: 1,
                p: 1,
                fontSize: '0.875rem',
                fontWeight: '700',
                width: "700px",
                margin: '0 auto',
                overflowY: "auto"

            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Controller
                        name={"name"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                {...register("name", { required: true })}
                                id="outlined-basic"
                                label="Name of specification" variant="outlined" sx={{ width: "100%", marginBottom: '20px' }}
                                onChange={onChange} value={value}
                            />
                        )}
                    />
                    <Controller
                        name={"engine"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                {...register("engine")}
                                id="outlined-select-currency"
                                select
                                label="Engine"
                                sx={{ width: "100%", marginBottom: '20px' }}
                                onChange={onChange} value={value}
                            >
                                {engine.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name={"material"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                {...register("material")}
                                id="outlined-select-currency"
                                select
                                label="Interior materials"
                                sx={{ width: "100%", marginBottom: '20px' }}
                                onChange={onChange} value={value}
                            >
                                {material.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name={"color"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                {...register("color")}
                                id="outlined-basic"
                                label="Color"
                                type="color"
                                variant="outlined"
                                onChange={onChange} value={value}
                                sx={{ width: "100%", marginBottom: '20px' }} />
                        )}
                    />
                    <Controller
                        name={"wheel"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                {...register("wheel")}
                                id="outlined-select-currency"
                                select
                                label="Wheel rims"
                                onChange={onChange} value={value}
                                sx={{ width: "100%", marginBottom: '20px' }}
                            >
                                {wheel.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name={"wheel_type"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                {...register("wheel_type")}
                                id="outlined-select-currency"
                                select
                                label="Type of wheels"
                                onChange={onChange} value={value}

                                sx={{ width: "100%", marginBottom: '20px' }}
                            >
                                {wheelMaterial.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        name={"air_suspension"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                sx={{ marginBottom: '20px' }}
                                {...register("air_suspension")}
                                onChange={onChange} checked={!!value}
                                control={<Checkbox />} label="Air suspension" />
                        )}
                    />
                    <Controller
                        name={"signature"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                {...register("signature")}
                                id="outlined-basic"
                                label="Signature on hood"
                                variant="outlined"
                                onChange={onChange} value={value}

                                sx={{ width: "100%", marginBottom: '20px' }} />
                        )}
                    />
                    {newConfigOption.length !== 0 &&
                        newConfigOption.map((item: Config, index: number) => {
                            if (item.type === 'text') {
                                return (
                                    <Controller
                                        name={item.name}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField key={index + item.name} id="outlined-basic" label={item.name} variant="outlined" sx={{ width: "100%", marginBottom: '20px' }} {...register(item.name)} onChange={onChange} value={value}
                                            />
                                        )}
                                    />
                                )
                            }
                            if (item.type === 'checkbox') {
                                return (
                                    <Controller
                                        name={item.name}
                                        control={control}
                                        key={index + item.name}
                                        render={({ field: { onChange, value } }) => (
                                            <FormControlLabel
                                                sx={{ marginBottom: '20px' }}
                                                {...register(item.name)}
                                                onChange={onChange} checked={!!value}
                                                control={<Checkbox />} label={item.name} />
                                        )}
                                    />
                                )
                            }
                        })
                    }

                    <Stack spacing={2} direction="row" justifyContent="space-between">
                        <Button variant="contained" onClick={handleOpen}>New config option</Button>
                        <Button variant="contained" type="submit">{activeSpecificationId ? "Change" : "Save"}</Button>
                    </Stack>
                </FormGroup>
            </form>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ width: "100%", marginBottom: '20px' }} onChange={(e) => { setName(e.target.value) }} />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Type of field"
                        value={type}
                        onChange={(event) => { setType(event.target.value) }}
                        sx={{ width: "100%", marginBottom: '20px' }}
                    >
                        {typeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" onClick={() => { setNewConfigOption([...newConfigOption, { name: name, type: type }]) }}>Save</Button>
                </Box>
            </Modal>
        </Box>
    )
}

export default SpecificationForm