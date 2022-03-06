import { useState } from "react";

import { 
  IconButton,
  Grid,
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

import { ISettingProps } from "../../../../../../ts/interfaces";

export const Setting = ({
  refParentContainer,
  defaultBrightness,
  defaultContrast,
  onMutateState,
}: ISettingProps) => {

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [brightness, setBrightness] = useState(defaultBrightness * 100);
  const [contrast, setContrast] = useState(defaultContrast * 100);

  const isOpenPopover = Boolean(anchorEl);

  const handleChangeBrightness = (newValue: number) => {
    setBrightness(newValue);

    onMutateState({
      brightness: newValue / 100,
      contrast: contrast / 100
    });
  };

  const handleChangeContrast = (newValue: number) => {
    setContrast(newValue);

    onMutateState({
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
      <Grid item>
        <IconButton sx={{ color: "#fff" }} onClick={handleClickSetting}>
          <SettingsSuggestIcon />
        </IconButton>
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
