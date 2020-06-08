import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  papersurround: {
    position: "relative",
    margin: "auto",
    width: "500px",
  },

  paper: {
    marginTop: theme.spacing(8),
    padding: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "#004064",
    width: "100px",
    height: "100px",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    background: "#004064",
  },

  error: {
    color: "red",
  },

  "@media (max-width: 1024px)": {
   form:{
     width: '100%'
   } 
  },
}));
