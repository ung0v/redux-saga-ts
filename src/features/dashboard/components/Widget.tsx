import { Box, Paper, styled, Typography } from '@mui/material';
import * as React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

export default function Widget({ title, children }: WidgetProps) {
  return (
    <Container>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Container>
  );
}
