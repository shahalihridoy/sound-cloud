import React, { Component } from "react";
import {
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Icon,
  Fab
} from "@material-ui/core";

class Pricing extends Component {
  pricingList = [
    {
      title: "Basic",
      subtitle: "Basic Solution",
      price: 0,
      allowedOfferIndexList: [0, 1],
      offerList: [
        "Upload 1 Track",
        "50km Starting Radius",
        "View and Analyze Listener Interactions",
        "1 Boost Per Month"
      ]
    },
    {
      title: "Plus",
      subtitle: "Advanced Platform",
      price: 4.99,
      allowedOfferIndexList: [0, 1, 2],
      offerList: [
        "Upload 5 Track",
        "100km Starting Radius",
        "View and Analyze Listener Interactions",
        "1 Boost Per Month"
      ]
    },
    {
      title: "Gold",
      subtitle: "Unlimited Platform",
      price: 7.99,
      allowedOfferIndexList: [0, 1, 2, 3],
      offerList: [
        "Upload Unlimited Track",
        "250km Starting Radius",
        "View and Analyze Listener Interactions",
        "1 Boost Per Month"
      ]
    }
  ];

  handleChoice = plan => {
    console.log(plan);
  };

  render() {
    return (
      <div className="pricing h-100vh" id="pricing">
        <div className="container y-center relative">
          <div className="w-100 text-center mb-32">
            <h2>Choose Your Plan</h2>
          </div>

          <Grid container spacing={2}>
            {this.pricingList.map(plan => {
              let {
                title,
                subtitle,
                price,
                allowedOfferIndexList,
                offerList
              } = plan;

              return (
                <Grid item lg={4} md={4} sm={12} xs={12} key={title}>
                  <Card className="text-center card-hover">
                    <CardHeader
                      className="pricing__card-header"
                      title={<strong>{title}</strong>}
                      subheader={subtitle}
                    />
                    <Divider />
                    <CardContent className="pricing__card-content px-16">
                      <h1 className="mt-16">${price}</h1>
                      <h4 className="mb-32">Per Month</h4>
                      {offerList.map((offer, index) => (
                        <div className="flex flex-middle flex-center pb-16">
                          {allowedOfferIndexList.includes(index) ? (
                            <Icon color="secondary" fontSize="small">
                              done
                            </Icon>
                          ) : (
                            <Icon color="error" fontSize="small">
                              close
                            </Icon>
                          )}
                          <div className="pl-8 pb-3" key={index}>
                            {offer}
                          </div>
                        </div>
                      ))}

                      <div className="text-center pt-16">
                        <Fab
                          size="large"
                          className="capitalize px-24"
                          color="secondary"
                          variant="extended"
                          onClick={() => this.handleChoice(title)}
                        >
                          <strong>Get Started</strong>
                        </Fab>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Pricing;
