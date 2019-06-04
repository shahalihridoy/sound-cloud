import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import {
  Grid,
  Button,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";

class Metadata extends Component {
  render() {
    let {
      loading,
      contains_music,
      composer,
      publisher,
      release_title,
      artist,
      isrc,
      record_label,
      release_date,
      buy_link,
      album_title,
      iswc,
      p_line,
      barcode,
      license,
      handleInputChange,
      handleSubmit,
      handleCancel
    } = this.props.state;
    return (
      <div className="my-16">
        <ValidatorForm
          ref="form"
          onSubmit={handleSubmit}
          onError={errors => null}
        >
          <Grid container spacing={2}>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Contains Music"
                onChange={handleInputChange}
                name="contains_music"
                select
                value={contains_music}
                variant="outlined"
              >
                {["Yes", "No"].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextValidator>
            </Grid>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Artist"
                onChange={handleInputChange}
                name="artist"
                value={artist}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Publisher"
                onChange={handleInputChange}
                name="publisher"
                value={publisher}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Composer"
                onChange={handleInputChange}
                name="composer"
                value={composer}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Release Title"
                onChange={handleInputChange}
                name="release_title"
                value={release_title}
                variant="outlined"
              />
            </Grid>

            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="ISRC"
                placeholder="USS1Z1001234"
                onChange={handleInputChange}
                name="isrc"
                value={isrc}
                variant="outlined"
              />
            </Grid>

            <div className="my-4 py-48" />

            <Grid item lg={12} md={12}>
              <TextValidator
                className="w-100"
                label="Buy Link"
                onChange={handleInputChange}
                name="buy_link"
                value={buy_link}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Album Title"
                onChange={handleInputChange}
                name="album_title"
                value={album_title}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Record Label"
                onChange={handleInputChange}
                name="record_label"
                value={record_label}
                variant="outlined"
              />
            </Grid>

            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="Release Date"
                onChange={handleInputChange}
                name="release_date"
                value={release_date}
                variant="outlined"
              />
            </Grid>

            <Grid item lg={8} md={8}>
              <TextValidator
                className="w-100"
                label="Barcode"
                onChange={handleInputChange}
                name="barcode"
                value={barcode}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={4} md={4}>
              <TextValidator
                className="w-100"
                label="ISWC"
                onChange={handleInputChange}
                name="iswc"
                value={iswc}
                variant="outlined"
              />
            </Grid>

            <Grid item lg={12} md={12}>
              <TextValidator
                className="w-100"
                label="P Line"
                placeholder="2019 XYZ Record Company Limited"
                onChange={handleInputChange}
                name="p_line"
                value={p_line}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={12} md={12}>
              <p className="p-0 pt-16">License</p>
              <RadioGroup
                className="flex w-100"
                aria-label="License"
                name="license"
                value={license}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  className="pr-16"
                  value="All rights reserved"
                  control={<Radio />}
                  label="All rights reserved"
                />
                <FormControlLabel
                  value="Creative Commons"
                  control={<Radio />}
                  label="Creative Commons"
                />
              </RadioGroup>
            </Grid>
          </Grid>

          <div className="flex flex-end py-16">
            <Button
              className="capitalize"
              variant="contained"
              color="secondary"
              type="submit"
              disabled={loading}
            >
              Save
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

export default Metadata;
