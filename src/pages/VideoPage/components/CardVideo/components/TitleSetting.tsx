import { useState } from "react";
import { 
  Typography,
  Grid,
  IconButton,
  Popover,
  Stack,
  Slider,
  Box
} from "@mui/material";
import {
  SettingsSuggest as SettingsSuggestIcon,
  BrightnessLow as BrightnessLowIcon,
  Contrast as ContrastIcon
} from '@mui/icons-material';

import { ITitleSettingProps } from "../../../../../ts/interfaces";

export const TitleSetting = ({ 
  title,
  defaultBrightness,
  defaultContrast,
  refParentContainer,
  handleSettings,
}: ITitleSettingProps) => {

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [brightness, setBrightness] = useState(defaultBrightness * 100);
  const [contrast, setContrast] = useState(defaultContrast * 100);

  const isOpenPopover = Boolean(anchorEl);

  const handleChangeBrightness = (newValue: number) => {
    setBrightness(newValue);

    handleSettings({
      brightness: newValue / 100,
      contrast: contrast / 100
    });
  };

  const handleChangeContrast = (newValue: number) => {
    setContrast(newValue);

    handleSettings({
      brightness: brightness / 100,
      contrast: newValue / 100
    });
  };

  const handleClickSetting = (e: any) => {   
    setAnchorEl(e.currentTarget);
  }

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent={'space-between'}
        style={{ padding: 16 }}
      >
        <Grid item>
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {title}
          </Typography>
        </Grid>

        <Grid item>
          <IconButton sx={{ color: "#fff" }} onClick={handleClickSetting}>
            <SettingsSuggestIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Popover 
        container={refParentContainer.current}
        open={isOpenPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
          <Box sx={{ 
            width: 200,
            
          }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1, mt: 1, mr: 3}} alignItems="center" >
              <BrightnessLowIcon sx={{ ml: 1}} />
                <Slider
                  aria-label="brightness" 
                  value={brightness} 
                  onChange={(e, value) => handleChangeBrightness(value as number)} 
                  sx={{color: 'white'}} 
                />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ mb: 1, mr: 3 }} alignItems="center" >
              <ContrastIcon sx={{ ml: 1}} />
              <Slider
                aria-label="contrast" 
                value={contrast} 
                onChange={(e, value) => handleChangeContrast(value as number)} 
                sx={{color: 'white'}} 
              />
            </Stack>

          </Box>

      </Popover>
    </>
  )
}
