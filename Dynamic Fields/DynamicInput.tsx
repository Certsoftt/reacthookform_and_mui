import React, {useEffect, useState} from 'react'
import logo from '../../../logo.svg'
import {FormLabel, FormControl, Stack, Typography, 
  TextField, Button, InputAdornment, IconButton,Switch,
  FormControlLabel, Autocomplete, Rating,
  Paper, Grid, Card, CardMedia, CardContent, CardActions, 
  Accordion, AccordionSummary, AccordionDetails,
  Divider} from "@mui/material"

import {useForm, FieldErrors, useFieldArray} from 'react-hook-form'
import {DevTool} from "@hookform/devtools"
import {Visibility, VisibilityOff} from "@mui/icons-material"
import { useTheme } from './Theme'

export type FormValues = {
  fullname:string
  username: string
  password: string
  confirmPassword: string
  email:string
  dob:string
  phoneNum: Array<{number:string}>
  socialHandle:{
    github:string
    linkedIn: string
  }
}
type InputPropsVisibility ={
  type: string
  visibility: React.ReactNode
}
type Skill = {
  id: number
  label: string
}

const DynamicInput = () => {
  const themeStyle = useTheme()
  const [passtype1, setPassType1] = useState<InputPropsVisibility | null>(null)
  const [passtype2, setPassType2] = useState<InputPropsVisibility | null>(null)
  const [devSkill, setDevSkill] = useState<Skill[]>([])
  const [mode, setMode] = useState(false)
  const handleMode = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setMode(
      e.target.checked
    )
  }
  const handleDevSkill = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: Array<Skill>)=>{
    return setDevSkill(newValue)
  }
  const setVisibilityAndType1 = ()=>{
      if(!passtype1){
      setPassType1({
          type: "password",
          visibility: <Visibility />
      })
      }else{
      if(passtype1.type === "password"){
          setPassType1({...passtype1, type:"text", visibility:<VisibilityOff/>})
      }else{
          setPassType1({
          ...passtype1,
          type: "password",
          visibility: <Visibility />
          })
      }
    }
  }
  const setVisibilityAndType2 = ()=>{
    if(!passtype2){
    setPassType2({
        type: "password",
        visibility: <Visibility />
    })
    }else{
    if(passtype2.type === "password"){
        setPassType2({...passtype2, type:"text", visibility:<VisibilityOff/>})
    }else{
        setPassType2({
        ...passtype2,
        type: "password",
        visibility: <Visibility />
        })
    }
  }
  }
  const form = useForm<FormValues>({
    defaultValues: async ()=>{
      //api call
      return{
        fullname:"",
        username: "",
        password: "",
        confirmPassword: "",
        email:"",
        dob:"",
        phoneNum: [{number:""}],
        socialHandle:{
          github:"",
          linkedIn: "",
        }
      }
    }
  })
  const {handleSubmit, control, register, formState, watch,reset} = form
  const {fields, append, remove}= useFieldArray({
    name: "phoneNum",
    control
  })
  const {errors, isDirty, isSubmitting, isValid} = formState
  const onSub = (data:FormValues)=>{
    console.log(data)
  }
  const onError = (errors: FieldErrors<FormValues>)=>{
    console.log(errors)
  }
  useEffect(
    ()=>{
      const subscription = watch(value=>{
        console.log(value)//{fullname:, username:, password...and so on}
      })
      // if(mode){
      //   document.body.style.backgroundColor = themeStyle.secondary.main
      // }else{
      //   document.body.style.backgroundColor = themeStyle.primary.main
      // }
      //cleanup
      return ()=>{
        subscription.unsubscribe()
      }
    },[watch,mode, themeStyle.secondary.main, themeStyle.primary.main]
  )
  let skills =["VanillaJS", "ReactJS", "NodeJS", "Axios", "PHP", "Express", "MySQL", "PostgreSQL", "MongoDB", "Python", "Django"]
  let skillsOption = skills.map((skill, index)=>(
    {
      id: 1 + index,
      label: skill
    }
  ))
  return (
    <Paper component="main" elevation={4}>
      <FormControl onSubmit={handleSubmit(onSub,onError)} component="form" noValidate sx={mode ? {backgroundColor:themeStyle.secondary.main}: {backgroundColor: themeStyle.primary.main}}>
        <Card sx={mode ? {backgroundColor:themeStyle.secondary.main}: {backgroundColor: themeStyle.primary.main}}>
          <CardMedia component="img" image={logo} height="150" alt="react logo image" sx={{backgroundColor: "#000000"}}/>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack component="p" spacing={2} direction="row">
                  <FormLabel>
                    <Typography variant="h6" color="success">Welcome Dev</Typography>
                  </FormLabel>
                  <FormControlLabel sx={mode?{color:themeStyle.secondary.text}:{color:themeStyle.primary.text}} control={<Switch checked={mode} onChange={handleMode}/>} label={!mode?`Dark Mode`:`Light Mode`}/>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack sx={{justifyContent:"center", alignItems:"center", marginTop:"10px"}} spacing={2} direction="row">
                  <Typography variant="h4" sx={mode?{color:themeStyle.secondary.text}:{color:themeStyle.primary.text}}>Please Fill The Form</Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Paper component="section" elevation={4} sx={mode?{color:themeStyle.secondary.text,backgroundColor:themeStyle.secondary.card,padding:"32px", margin:"32px"}:{color:themeStyle.primary.text,backgroundColor:themeStyle.primary.main,padding:"32px", margin:"32px"}}>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                  spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField sx={mode?{color:themeStyle.secondary.text}:{color:themeStyle.primary.text}} variant="standard" type="text" {...register("fullname",{
                    required:{
                      value:true,
                      message: "Fullname is required"
                    },
                    pattern:{
                      value:/[a-zA-z]{5,}/,
                      message: "enter 5 characters or more and only aphabets"
                    },
                    validate:{
                      notAdmin: (fieldValue)=>(
                        fieldValue?.toLowerCase() !== "admin" || "Can't Use admin as fullname"
                      )
                    }
                    })} error={!!errors.fullname}
                    helperText={typeof errors.fullname?.message !== "undefined"?`${errors.fullname?.message}`:`fullname: ${watch("fullname")}`}
                  label="Enter Fullname" required/>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                  spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField variant="standard" type="text" {...register("username",{
                    required:{
                      value:true,
                      message: "Username is required"
                    },
                    pattern:{
                      value:/[a-zA-z]{5,}/,
                      message: "Username must be greater than 4 and only aphabets"
                    },
                    validate:{
                      notAdmin: (fieldValue)=>(
                        fieldValue?.toLowerCase() !== "admin" || "Can't Use admin as username"
                      )
                    }
                  })} error={!!errors.username}
                  helperText={typeof errors.username?.message !== "undefined"?`${errors.username?.message}`:`username: ${watch("username")}`}
                  label="Enter Username" required/>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                  spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField variant="standard" type="email" {...register("email",{
                    disabled:watch("username") === "",
                    required: {
                      value: true,
                      message: "Email is required"
                    },
                    pattern:{
                      value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message:"Invalid Email Address"
                    },
                    validate:{
                      notAdmin: (fieldValue)=>(
                        !fieldValue.includes("admin") || "Email must not contain the word 'admin'"
                      )
                    }
                  })} required label="Enter email"
                  error={!!errors.email}
                  helperText={typeof errors.email?.message !== "undefined"?`${errors.email?.message}`:`email: ${watch("email")}`}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                  spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField variant="standard" type="date" {...register("dob",{
                    valueAsDate: true,
                    disabled: watch("email") === "",
                    required:{
                      value: true,
                      message: "Date of Birth is required"
                    }
                  })} required label="Enter dob"
                  error={!!errors.dob}
                  helperText={typeof errors.dob?.message !== "undefined"?`${errors.dob?.message}`:`dob:`}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <Stack spacing={2} direction="column" width="230px">
                    {
                      fields.map((field, index)=>{
                        
                        return(
                          <React.Fragment>
                            <TextField variant="standard" type="number" key={field.id} {...register(`phoneNum.${index}.number`,{
                              disabled: watch("email") === "",
                              valueAsNumber: true,
                              required:{
                                value: true,
                                message: "phone number is required"
                              }
                            })}
                            required label="Enter phone number"/>
                            {
                              index > 0 && (
                                <Button variant="outlined" size="small" type="button" onClick={()=>remove(index)}>Remove</Button>
                              )
                            }
                          </React.Fragment>
                        )
                      })
                    }
                    <Button type="button" variant="contained" size="small" onClick={()=>append({number:""})}>Add Another Number</Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                  spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <Stack spacing={2} direction="column" width={230}>
                    <Autocomplete multiple options={skillsOption} value={devSkill} onChange={handleDevSkill} freeSolo renderInput={(params)=>(
                      <TextField variant="standard" label="Select 3 Core Skills" {...params}/>
                    )}/>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          {
            devSkill.length > 0 &&
            <CardContent>
              <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Stack sx={{justifyContent:"center", alignItems:"center"}} spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                    <Typography variant="h6">Rate Your Skill</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          }
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={2}>
                  {
                    (devSkill.length > 0 && devSkill.length <= 3) && devSkill.map(devskill=>(
                      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                          spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                          <Paper elevation={4} sx={{padding:"16px"}}>
                            <Typography variant="body1">{devskill.label}</Typography>
                            <Rating precision={0.5} size="small" color="primary"/>
                          </Paper>
                        </Stack>
                      </Grid>
                    ))
                  }
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField variant="standard" type={!passtype1?"password":passtype1.type} {...register("password",{
                    disabled: watch("email") === "",
                    required:{
                      value: true,
                      message: "Password is required"
                    },
                    validate:{
                      moreThanEightChar: (fieldValue)=>(
                        !!fieldValue && (fieldValue.length >= 8 || "Password should be 8 characters or more")
                      )
                    }
                  })} slotProps={{
                    input:{
                      endAdornment: <InputAdornment position="end" onClick={setVisibilityAndType1}>
                        <IconButton color="primary">
                          {!passtype1?<Visibility/>:passtype1.visibility}
                        </IconButton>
                      </InputAdornment>
                    }
                  }} required label="Enter Password"
                  error={!!errors.password}
                  helperText={typeof errors.password?.message !== "undefined"?`${errors.password?.message}`:`password: ${watch("password")}`}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                  spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField variant="standard" type={!passtype2?"password":passtype2.type} {...register("confirmPassword",{
                    disabled: watch("password") === "",
                    required:{
                      value: true,
                      message: "Password is required"
                    },
                    validate:{
                      samePassword: ()=>(
                        watch("password") === watch("confirmPassword") || "Password is not same"
                      )
                    }
                  })} slotProps={{
                    input:{
                      endAdornment: <InputAdornment position="end" onClick={setVisibilityAndType2}>
                        <IconButton color="primary">
                          {!passtype2?<Visibility/>:passtype2.visibility}
                        </IconButton>
                      </InputAdornment>
                    }
                  }} required label="Confirm Password"
                  error={!!errors.confirmPassword}
                  helperText={typeof errors.confirmPassword?.message !== "undefined"?`${errors.confirmPassword?.message}`:`confirmPassword: ${watch("confirmPassword")}`}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField variant="standard" type="text" {...register("socialHandle.github",{
                  disabled:watch("password")==="",
                  required:{
                      value:true,
                      message: "Github handle is rquired"
                  }
                  })} required label="Enter Github Handle"
                  error={!!errors.socialHandle?.github}
                  helperText={typeof errors.socialHandle?.github?.message !== "undefined"?`${errors.socialHandle?.github?.message}`:`github: ${watch("socialHandle.github")}`}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Stack sx={{justifyContent:"center", alignItems:"center"}} 
                  spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem/>}>
                  <TextField variant="standard" type="text" {...register("socialHandle.linkedIn",{
                  disabled:watch("password")==="",
                  required:{
                      value:true,
                      message: "LinkedIn handle is rquired"
                  }
                  })} required label="Enter LinkedIn Handle"
                  error={!!errors.socialHandle?.linkedIn}
                  helperText={typeof errors.socialHandle?.linkedIn?.message !== "undefined"?`${errors.socialHandle?.linkedIn?.message}`:`linkedIn: ${watch("socialHandle.linkedIn")}`}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack spacing={2} direction="row" sx={{justifyContent:"center", alignItems:"center"}}>
                  <Button type="submit" variant="contained" size="medium" disabled={!isDirty || !isValid || isSubmitting}>Submit</Button>
                  <Button type="button" variant="contained" size="medium" onClick={()=>reset()}>Reset</Button>
                </Stack>
              </Grid>
            </Grid>
          </CardActions>
          </Paper>
        </Card>
      </FormControl>
      <DevTool control={control} />
    </Paper>
  )
}

export default DynamicInput
