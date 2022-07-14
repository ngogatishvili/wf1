import React, { useState } from 'react';

import {
  Paper,
  Divider,
  Container,
  Typography,
  Button,
  AppBar,
  TextField,
} from '@mui/material';
import { Password, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAlertText,
  showChangeAlertSelector,
  changeUsername,
  updatePassword,
  showPassAlertSuccessSelector,
  passAlertSuccessSelector,
  showPassAlertErrorSelector,
  passAlertErrorSelector,
} from '../../redux';
import CustomAlert from '../../components/Alert';
import CustomPassword from './Password';

function SettingsPage() {
  const alertData = useSelector((store) => ({
    showAlert: showChangeAlertSelector(store),
    alertText: changeAlertText(store),
    showPassSuccessAlert: showPassAlertSuccessSelector(store),
    passSuccessText: passAlertSuccessSelector(store),
    showPassErrorAlert: showPassAlertErrorSelector(store),
    passErrorText: passAlertErrorSelector(store),
  }));
  const {
    showAlert,
    alertText,
    showPassErrorAlert,
    showPassSuccessAlert,
    passErrorText,
    passSuccessText,
  } = alertData;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const [editMode, setEditMode] = useState(false);
  const [passEdit, setPassEdit] = useState(false);
  const [userName, setUsername] = useState(user?.name);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsData, setPasswordsData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const switchToEditMode = () => {
    setEditMode(true);
  };

  const cancelUsernameUpdate = () => {
    setEditMode(false);
    setUsername(user?.name);
  };

  const saveUpdatedUsernameChanges = async (id, value) => {
    const updatedUsername = await dispatch(changeUsername(id, value));
    if (updatedUsername) {
      setUsername(updatedUsername);
      setEditMode(false);
    }
  };

  const changePassword = (e) => {
    setPasswordsData({ ...passwordsData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const cancelPasswordChange = () => {
    setPassEdit(false);
    setPasswordsData({
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    });
  };

  const savePasswordChanges = async (id, value) => {
    const data = await dispatch(updatePassword(id, value));
    if (data?.success) {
      setPassEdit(false);
    }
  };

  return (
    <Container maxWidth="lg">
      {showAlert && <CustomAlert message={alertText} />}

      <AppBar position="static" color="inherit">
        {showPassSuccessAlert && <CustomAlert message={passSuccessText} />}
        <Settings />
        <Typography variant="h2">Settings</Typography>
      </AppBar>
      <Divider />
      <Paper style={{ margin: '20px 0' }} spacing={2}>
        <div className="settingItem">
          <div className="currentCreds">
            <Typography variant="h6">Change username</Typography>
            {showPassErrorAlert && <CustomAlert message={passErrorText} />}
            {editMode && (
              <>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  onClick={() => saveUpdatedUsernameChanges(userId, userName)}
                  color="success"
                  variant="contained"
                >
                  Save Changes
                </Button>
                <Button onClick={cancelUsernameUpdate} color="error">
                  cancel
                </Button>
              </>
            )}
            {!editMode && (
              <Typography variant="h6" color="textSecondary">
                {userName}
              </Typography>
            )}
          </div>

          <Button
            onClick={switchToEditMode}
            variant="contained"
            color="primary"
          >
            Change
          </Button>
        </div>
        <Divider />
        <div className="settingItem">
          <div className="currentCreds">
            <Typography variant="h6">Change password</Typography>
            {!passEdit && <Password />}

            {passEdit && (
              <>
                <CustomPassword
                  name="oldPassword"
                  handleChange={changePassword}
                  handleShowPassword={handleShowPassword}
                  type={showPassword ? 'text' : 'password'}
                  value={passwordsData.oldPassword}
                  label="Enter old Password"
                />

                <CustomPassword
                  name="newPassword"
                  handleChange={changePassword}
                  handleShowPassword={handleShowPassword}
                  type={showPassword ? 'text' : 'password'}
                  value={passwordsData.newPassword}
                  label="Enter new password"
                />
                <CustomPassword
                  name="repeatPassword"
                  handleChange={changePassword}
                  handleShowPassword={handleShowPassword}
                  type={showPassword ? 'text' : 'password'}
                  value={passwordsData.repeatPassword}
                  label="Repeat new password"
                />

                <Button
                  onClick={() => savePasswordChanges(userId, passwordsData)}
                  variant="contained"
                  color="success"
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={cancelPasswordChange}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
          <Button
            onClick={() => setPassEdit(true)}
            variant="contained"
            color="primary"
          >
            Change
          </Button>
        </div>
        <Divider />
        <Button color="primary">
          <Link to="/">Back to Home</Link>
        </Button>
      </Paper>
    </Container>
  );
}

export default SettingsPage;
