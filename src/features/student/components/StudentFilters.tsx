import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { City, ListParams } from 'models';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useRef } from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (filter: ListParams) => void;
  onSearchChange?: (filter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) {
      return;
    }
    const newFilter: ListParams = {
      ...filter,
      name_like: event.target.value,
      _page: 1,
    };
    onSearchChange?.(newFilter);
  };

  const handleCityChange = (event: SelectChangeEvent<HTMLSelectElement>) => {
    if (!onChange) {
      return;
    }
    const newFilter: ListParams = {
      ...filter,
      city: event.target.value || undefined,
      _page: 1,
    };
    onChange(newFilter);
  };

  const handleSortChange = (event: SelectChangeEvent<HTMLSelectElement>) => {
    if (!onChange) {
      return;
    }

    const value = event.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilters = () => {
    if (!onChange) {
      return;
    }
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    if (searchRef.current) {
      searchRef.current.value = '';
    }
    onChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard" size="small">
            <InputLabel htmlFor="standard-adornment-amount">Search</InputLabel>
            <Input
              id="standard-adornment-amount"
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              startAdornment={<SearchIcon />}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              id="demo-simple-select"
              value={filter.city || ''}
              label="Filter by city"
              onChange={handleCityChange}
            >
              <MenuItem value="">All</MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="sortBy">Sort by</InputLabel>
            <Select
              labelId="sortBy"
              id="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : (`''` as any)}
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilters}>
            Clear filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
