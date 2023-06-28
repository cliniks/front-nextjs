import { Box, Card, Link, Typography, styled } from "@mui/material";

const FooterWrapper = styled(Card)(
  ({ theme }) => `
        border-radius: 0;
        margin-top: ${theme.spacing(4)};
`
);

export function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        p={4}
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; 2022 - TODOS OS DIREITOS RESERVADOS -{" "}
            <Link
              href="https://cliniks.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              CLINIKS
            </Link>
          </Typography>
        </Box>
      </Box>
    </FooterWrapper>
  );
}
