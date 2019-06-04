import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Grid,
  Button,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Icon,
  Fab
} from "@material-ui/core";

class BasicInfo extends Component {
  genreList = ["Classic", "Dance", "Disco", "Deep House"];

  state = {
    imgUrl: "/assets/images/bg-1.jpg",
    img: ""
  };

  handleImageSelect = event => {
    let file = event.target.files[0];
    let url = URL.createObjectURL(file);

    this.setState({ imgUrl: url });
    this.props.handleImageSelection(file);
  };

  render() {
    let {
      title,
      genre,
      tag,
      description,
      permission,
      loading,
      handleInputChange,
      handleSubmit,
      handleCancel
    } = this.props.state;
    return (
      <Grid className="basic-info py-16" container>
        <Grid lg={4} md={4} item>
          <img src={this.state.imgUrl} />
          <label className="basic-info__label" htmlFor="upload-image">
            <Fab
              className="capitalize x-center"
              color="secondary"
              component="span"
              variant="extended"
            >
              <Icon className="pr-8">camera_alt</Icon>
              <span>upload image</span>
            </Fab>
          </label>
          <input
            accept="image/*"
            onChange={this.handleImageSelect}
            id="upload-image"
            type="file"
          />
        </Grid>
        <Grid lg={8} md={8} item>
          <ValidatorForm
            ref="form"
            className="pl-32"
            onSubmit={handleSubmit}
            onError={errors => null}
          >
            <TextValidator
              className="mb-8 w-100"
              label="Title"
              onChange={handleInputChange}
              name="title"
              value={title}
              validators={["required"]}
              errorMessages={["This field is required"]}
              variant="outlined"
            />
            <TextValidator
              className="my-8 mb-16 w-100"
              label="Genre"
              onChange={handleInputChange}
              name="genre"
              select
              value={genre}
              validators={["required"]}
              errorMessages={["This field is required"]}
              variant="outlined"
            >
              {this.genreList.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextValidator>
            <TextValidator
              className="my-8 w-100"
              label="Tag"
              onChange={handleInputChange}
              name="tag"
              value={tag}
              variant="outlined"
            />
            <TextValidator
              className="my-8 w-100"
              label="Description"
              onChange={handleInputChange}
              name="description"
              value={description}
              variant="outlined"
              multiline
            />

            <RadioGroup
              className="flex"
              aria-label="permission"
              name="permission"
              value={permission}
              onChange={handleInputChange}
            >
              <FormControlLabel
                className="pr-16"
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>

            <div className="flex flex-end py-16">
              <Button
                onClick={handleCancel}
                type="button"
                className="capitalize mr-16"
                variant="text"
              >
                Cancel
              </Button>
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
        </Grid>
      </Grid>
    );
  }
}

export default BasicInfo;
