const styles = () => ({
  media: {
    height: '120px',
    width: '120px',
    margin: '20px auto'
  },
  cardHeaderTitle : {
    fontSize: '16px',
    textAlign: 'center'

  },
  circularProgress: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "Center"
  },
  averageTempratureDiv: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px'
    // justifyContent: "space-between"
  },
  formControl: {
    width: "100%",
  },
  formLabel: {
    width: "100%",
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: 600
  },
  opacity: {
    opacity: .54
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around" 
  },
  divider: {
    margin: "1rem 0"
  },
  buttonGridContainer: {
    marginBottom: "16px"
  },
  weatherCardGridContainer: {
    // marginBottom: "2.5rem",
    width: '100%'
  },
  singleWeatherGrid: {
    maxWidth: "320px",
    marginBottom: '2.5rem'
  },
  singleWeatherGridCard: {
    padding: "8px 16px",
    background: 'linear-gradient(#0B067A, #4F1484)',
    color: '#fff',
    borderRadius: '8px'
  },
  superScript: {
    fontSize: '1.5rem'
  }
});

export default styles;
