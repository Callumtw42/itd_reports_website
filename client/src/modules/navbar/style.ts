import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    minHeight: 150,
    backgroundColor: "#004064",
  },

  title: {
    flexGrow: 1,
    fontSize: 48,
  },

  headerBox: {
    display: "flex",
    flexDirection: "column",
  },

  link: {
      color: "white",
      textDecoration: "none"
  }
}));
export default useStyles;
