import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../../src/ProTip";
import Link from "../../src/Link";
import Copyright from "../../src/Copyright";

import { Slider } from "@mui/material";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link
          href="/about"
          color="secondary"
          underline="hover"
          className="text-xl"
        >
          Go to about page
        </Link>

        <h1 className="underline">Hello world</h1>
        <Slider defaultValue={30} className="text-red-700" />

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
