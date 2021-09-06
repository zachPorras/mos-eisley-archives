import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import desert_hills from '../../assets/Images/desert_hills1.jpg';


const useStyles = makeStyles(() =>
  createStyles({
    root:{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${desert_hills});`,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      zIndex: -1,
      padding: '0',
      margin: '0',
      display: 'flex',
      justifyContent: 'center'
  },
    form: {
        marginTop: '15rem',
        marginLeft: '15rem'
    },
    h2: {
      fontFamily: 'Star Jedi'
    }
  }));


  export const SignIn = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const token = sessionStorage.getItem("token");
    const classes = useStyles();

    const onSubmitClick = (
        event: React.MouseEvent<HTMLButtonElement>
        )=>{
      event.preventDefault()
      console.log("You pressed login")
      let opts = {
        'email': email,
        'password': password
      };

      fetch('/signin', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(opts)
      }).then(response => response.json())
        .then(data => {
          console.log("this came from the backend", data);
          {data.msg && data.msg === "Bad username or password" ? (
            window.alert("Invalid, please try again!")
          ) : (
            sessionStorage.setItem("token", data.access_token)
          )}
          
        })
      }

    const handleEmailChange = (
        event: React.ChangeEvent<HTMLInputElement>
        )=>{
      setEmail(event.target.value)
    }
  
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
        )=>{
      setPassword(event.target.value)
    }
  

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <h2 className={classes.h2}>Login</h2>
          {token && token !== "" && token !== undefined ? ("You are logged in with a token") : (
            <form action="#">
            <div>
              <input type="text" 
                placeholder="email" 
                onChange={handleEmailChange}
                value={email} 
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <button onClick={onSubmitClick} type="submit">
              Login
            </button>
          </form>
          )}
        </div>
      </div>
    )
  }