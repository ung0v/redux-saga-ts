import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, createTheme, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export interface AddEditPageProps {}
const theme = createTheme();

export default function AddEditPage(props: AddEditPageProps) {
  const { studentId } = useParams<{ studentId: string }>();

  const isEdit = !!studentId;

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('failed to fetch student details');
      }
    })();
  }, []);

  return (
    <Box>
      <Link
        to="/admin/students"
        style={{
          textDecoration: 'none',
          color: theme.palette.primary.main,
        }}
      >
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      {isEdit ? (
        <Typography variant="h4">Edit a student</Typography>
      ) : (
        <Typography variant="h4">Add new a student</Typography>
      )}
    </Box>
  );
}
