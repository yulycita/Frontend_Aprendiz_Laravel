import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import PrincipalView from "./views/PrincipalView";
import MongoView from "./views/MongoView";

const App = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#ffffff" }}>
        <Tabs value={tab} onChange={(_, valor) => setTab(valor)} centered>
          <Tab label="Aprendices (SQL)" />
          <Tab label="Aprendices (Mongo)" />
        </Tabs>
      </Box>
      {tab === 0 ? <PrincipalView /> : <MongoView />}
    </>
  );
};

export default App;