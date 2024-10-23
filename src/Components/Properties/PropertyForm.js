const propertyForm = {
  basic: {
    buildingType: { name: "Building Type", type: "text", placeholder: "Enter building type" },
    price: { name: "Price", type: "number", placeholder: "Enter price" },
    age: { name: "Age", type: "number", placeholder: "Enter age" },
    description: { name: "Property Description", type: "text", placeholder: "Enter description" },
    negotiable: { name: "Negotiable", type: "select",options:['Yes','No'], placeholder: "" },
    ownership: { name: "Ownership", type: "select", options: ['Sole','Joint','Community','Trust'], placeholder: "Select ownership" },
    approved: { name: "Approved", type: "select",options:['Yes','No'], placeholder: "" },
    hasLoan: { name: "Bank Loan", type: "select",options:['Available','Not Available'], placeholder: "" }
  },
  details: {
    length: { name: "Length", type: "number", placeholder: "Enter length" },
    area: { name: "Area", type: "number", placeholder: "Enter area" },
    noOfBHK: { name: "No of BHK", type: "number", placeholder: "Enter number of BHK" },
    attached: { name: "Attached", type: "select",options:['Yes','No'], placeholder: "" },
    furnished: { name: "Furnished", type: "select", options: ['Fully','Semi','Unfurnished'], placeholder: "Select furnished status" },
    lift: { name: "Lift", type: "select", options:['Available','Not Available'],placeholder:"Select Lift status" },
    facing: { name: "Facing", type: "text", placeholder: "Enter facing direction" },
    breadth: { name: "Breadth", type: "number", placeholder: "Enter breadth" },
    areaUnit: { name: "Area Unit", type: "text", placeholder: "Enter area unit" },
    noOfFloor: { name: "No of Floors", type: "number", placeholder: "Enter number of floors" },
    westernToilet: { name: "Western Toilet", type: "select",options:['Available','Not Available'], placeholder: "" },
    carParking: { name: "Car Parking", type: "select",options:['Available','Not Available'], placeholder: "Select Car Parking status" },
    electricity: { name: "Electricity", type: "text", placeholder: "Enter electricity status" }
  },
  general: {
    ownerName: { name: "Owner", type: "text", placeholder: "Enter owner name" },
    postedBy: { name: "Posted By", type: "text", placeholder: "Enter posted by" },
    featuredPackage: { name: "Featured Package", type: "text", placeholder: "Enter featured package" },
    mobile: { name: "Mobile", type: "text", placeholder: "Enter mobile number" },
    saleType: { name: "Sale Type", type: "text", placeholder: "Enter sale type" },
    ppdPackage: { name: "PPD Package", type: "text", placeholder: "Enter PPD package" },
    " ":{ name: " ", type: "file", accept:"image/*" }
  },
  location: {
    email: { name: "Email", type: "email", placeholder: "Enter email" },
    area: { name: "Area", type: "number", placeholder: "Enter area" },
    address: { name: "Address", type: "text", placeholder: "Enter address" },
    latitude: { name: "Latitude", type: "number", placeholder: "Enter latitude" },
    city: { name: "City", type: "text", placeholder: "Enter city" },
    pincode: { name: "PinCode", type: "text", placeholder: "Enter pincode" },
    landmark: { name: "Landmark", type: "text", placeholder: "Enter landmark" },
    longitude: { name: "Longitude", type: "number", placeholder: "Enter longitude" }
  },
  owner: { name: "Owner", type: "text", placeholder: "Enter owner ID" },
  imageUrl: { name: "Image Link", type: "text", placeholder: "Enter image URL" }
};


export default propertyForm