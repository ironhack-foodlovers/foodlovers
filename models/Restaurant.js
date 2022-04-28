const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const restaurantSchema = new Schema(
  {
    name: {
        type: String,
    },
    street: String,
    houseNumber: Number,
    zipCode: Number,
    city: String,
    country: String,
    geoCoordinates: Array,

    telephone: String,
    url: String,

    imageUrl: String,

    tags: [],
    description: String,
    liked: Boolean,

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;