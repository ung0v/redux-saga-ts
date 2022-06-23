import { ChevronLeft } from '@mui/icons-material';
import { Box, createTheme, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StudentForm from './components/StudentForm';

export interface AddEditPageProps {}
const theme = createTheme();

export default function AddEditPage(props: AddEditPageProps) {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

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
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    // throw new Error('My testing error');

    navigate('/admin/students');
  };

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

      <Typography variant="h4">{isEdit ? 'Edit a student' : 'Add new a student'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
