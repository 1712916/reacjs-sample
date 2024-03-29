import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  callAddCategory,
  callDeleteCategory,
  callGetCategoryList,
} from "./ExpenseApi";
import CloseIcon from "@mui/icons-material/Close";
import { SnackMessageType, useSnackbar } from "../../components/SnackBar";

export default function InputCategoryView() {
  const [inputValue, setInputValue] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    loadCategory();
  }, []);

  function loadCategory() {
    callGetCategoryList(
      (categories) => {
        setCategoryList(categories);
        setSelectedCategory(categories[0]);
      },
      () => {},
    );
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    callAddCategory(
      {
        name: inputValue?.trim(),
      },
      (categories) => {
        openSnackbar("Create category successfully!", SnackMessageType.success);
        setInputValue(null);
        loadCategory();
      },
      (err) => {
        openSnackbar(`${err}`, SnackMessageType.error);
      },
      () => {},
    );
  };

  const handleDelete = (category) => {
    callDeleteCategory(
      category,
      (categories) => {
        openSnackbar("Delete category successfully!", SnackMessageType.success);
        setInputValue(null);
        loadCategory();
      },
      (err) => {
        openSnackbar(`${err}`, SnackMessageType.error);
      },
      () => {},
    );
  };

  return (
    <Card
      sx={{
        m: 2,
        p: 2, // backgroundColor: "#c0d7f1",
        // p: "16px",
        // alignItems: "center",
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8} sm={9} md={10} lg={10} xl={10}>
              <TextField
                flex={8}
                label="Nhập loại chi tiêu"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={inputValue || ""} // Ensure that value is not null
                InputProps={{
                  endAdornment: inputValue && (
                    <IconButton
                      aria-label="clear input"
                      onClick={() => setInputValue(null)}
                    >
                      <CloseIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
              <Button
                flex={2}
                disabled={inputValue === null}
                fullWidth
                variant="contained"
                color="primary"
                style={{ maxHeight: "56px", minHeight: "56px" }}
                onClick={handleSubmit}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Loại chi tiêu</Typography>

          <Grid container spacing={1}>
            {categoryList.map((category, index) => (
              <Grid item key={index}>
                <Chip
                  label={category.name}
                  variant={
                    category.id === selectedCategory.id ? "filled" : "outlined"
                  }
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  onDelete={() => {
                    handleDelete(category);
                  }}
                >
                  {category.name}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Card>
  );
}
