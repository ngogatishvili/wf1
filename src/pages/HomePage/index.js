import {
  Typography,
  IconButton,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Filebase from 'react-file-base64';
import Pagination from '../../components/Pagination';
import SingleToDoItem from '../../components/SingleToDoItem';
import CustomALert from '../../components/Alert';
import {
  getTodoItems,
  logout,
  createTodoItem,
  selectTodoItems,
  showAlertSelector,
  alertTextSelector,
  uploadImage,
  showImageAlertSelector,
  imageAlertTextSelector,
} from '../../redux';

function HomePage() {
  const inputRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem('user'));

  // useSelector hook

  const todoItemsData = useSelector((store) => ({
    todoItems: selectTodoItems(store),
    showAlert: showAlertSelector(store),
    alertText: alertTextSelector(store),
    showImgAlert: showImageAlertSelector(store),
    imgAlertText: imageAlertTextSelector(store),
  }));

  const { todoItems, showAlert, alertText, showImgAlert, imgAlertText } = todoItemsData;

  // useDispatch hook

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoItems());
  }, [dispatch]);

  const [showLogout, setShowLogout] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(userData.image);

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(createTodoItem({ name: inputRef.current.value }));
    inputRef.current.value = '';
  };

  const addTodoHandlerForKeyBoardSubmit = (e) => {
    if (e.which === 13) {
      dispatch(createTodoItem({ name: inputRef.current.value }));
      inputRef.current.value = '';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
  };

  const handleCancelUpload = () => {
    setShowUpload(false);
    setUploadedImage(userData.image);
  };

  const saveUploadedProfile = async () => {
    const imageObj = new FormData();
    imageObj.append('avatar', uploadedImage);
    const uploadedImageFile = await dispatch(

      uploadImage(userData.id, imageObj),
    );
    console.log(uploadedImageFile);
    if (uploadedImageFile) {
      setUploadedImage(uploadedImageFile);
      setShowUpload(false);
    }
  };

  return (
    <div className="App">
      {showImgAlert && <CustomALert message={imgAlertText} />}
      <div className="navbar">
        <div className="avatar">
          <div className="column">
            <Avatar src={userData.image} sx={{ width: 100, height: 100 }} />
            <Typography variant="body1" color="textSecondary">
              {userData.name}
            </Typography>
            {!showUpload && (
              <Button
                color="secondary"
                onClick={() => setShowUpload(true)}
                style={{ textTransform: 'none' }}
                size="small"
                fontSize="small"
              >
                Update your profile picture
              </Button>
            )}

            {showUpload && (
              <div>
                <input
                  type="file"
                  multiple={false}
                  onChange={(e) => setUploadedImage(e.target.files[0])}
                />

                <Button
                  onClick={saveUploadedProfile}
                  color="success"
                >
                  Save changes
                </Button>
                <Button onClick={handleCancelUpload} color="error">
                  cancel
                </Button>
              </div>
            )}
            {showLogout && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>

          <FaCaretDown onClick={() => setShowLogout(!showLogout)} />
        </div>

        <div className="column">
          <Button
            style={{ margin: '10px 0' }}
            variant="contained"
            color="secondary"
          >
            <Link style={{ color: '#fff' }} to="/settings">
              Go to Settings
            </Link>
          </Button>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>

      <header>
        <Typography variant="h2">To do List </Typography>
      </header>
      <div className="form-control">
        {showAlert && <CustomALert message={alertText} />}
        <TextField
          label="add todo item"
          color="secondary"
          inputRef={inputRef}
          type="text"
          onKeyUp={addTodoHandlerForKeyBoardSubmit}
        />
        <IconButton
          onClick={addTodoHandler}
          color="secondary"
          size="large"
          type="submit"
        >
          <Add />
        </IconButton>
      </div>
      <div className="itemContainer">
        {todoItems?.length ? (
          todoItems.map((item) => (
            <SingleToDoItem key={item._id} item={item} todoItems={todoItems} />
          ))
        ) : (
          <h1>No todo items yet</h1>
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default HomePage;
