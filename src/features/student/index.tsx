import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export interface StudentProps {}

export default function Student(props: StudentProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.getCityList());
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}
