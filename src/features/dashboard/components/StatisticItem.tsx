import { Box, Paper, styled, Typography } from '@mui/material';
import * as React from 'react';

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const StatisticPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  border: `1px solid ${theme.palette.divider}`,
}));

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  return (
    <StatisticPaper>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </StatisticPaper>
  );
}
