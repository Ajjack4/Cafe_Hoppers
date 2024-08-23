import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState, MutableRefObject } from "react";

interface PasswordFieldProps {
  passwordRef: MutableRefObject<HTMLInputElement | null>;
  id?: string;
  label?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  passwordRef,
  id = "password",
  label = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      margin="normal"
      variant="standard"
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      inputRef={passwordRef}
      inputProps={{ minLength: 6 }}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
