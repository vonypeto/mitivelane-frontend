export const resident_details = {
    number: [
        {
            message: "This data must be number only!!",
            type: "email"
        },
    ],
    first_name: [
        {
            required: true,
            message: "Please enter first name.",
        },
    ],
    last_name: [
        {
            required: true,
            message: "Please enter last name.",
        },
    ],    
    middle_name: [
        {
            required: true,
            message: "Please enter middle name.",
        },
    ],
    // alias: [
    //     {
    //         required: true,
    //         message: "Please enter alias.",
    //     },
    // ],
    // age: [
    //     {
    //         required: true,
    //         message: "Please enter your age.",
    //         type: "integer",
    //     }
    // ],
    weight: [
        {
            required: true,
            message: "Please enter your weight.",
        },
    ],
    height: [
        {
            required: true,
            message: "Please enter your height.",
        },
    ],
    birthday: [
        {
            required: true,
            message: "Please enter your birthday",
        },
    ],
    gender: [
        {
            required: true,
            message: "Please enter your gender.",
        },
    ],
    blood_type: [
        {
            required: true,
            message: "Please enter your blodd type.",
        },
    ],
    voter_status: [
        {
            required: true,
            message: "Please enter your voter status.",
        },
    ],
};

export const address_contacts = {
    address_1: [
        {
            required: true,
            message: "Please enter your full address.",
        },
    ],
    address_2: [],
    address_3: [],
    purok: [
        // {
        //     required: true,
        //     message: "Please select purok you currenlty living in.",
        // },
    ],
    father: [
        // {
        //     required: true,
        //     message: "Please enter your father's name.",
        // },
    ],
    mother: [
        // {
        //     required: true,
        //     message: "Please enter your mother's name.",
        // },
    ],
    spouse: [
        // {
        //     required: true,
        //     message: "Please enter your spouse's name.",
        // },
    ],
    telephone: [
        // {
        //     required: true,
        //     message: "Please enter your telephone number.",
        // },
    ],
    mobile_number: [
        // {
        //     required: true,
        //     message: "Please enter your mobile number.",
        // },
    ],

    email_address: [
        {
            // required: true,
            // message: "Please enter your spouse's name.",
        },
        {
            type: "email",
            message: "Please enter a validate email!",
        },
    ],
};

export const social_welfare = {
    pag_ibig: [
        // {
        //     required: true,
        //     message: "Please enter your PAG-IBIG numbe.r",
        // },
    ],
    philhealth: [
        // {
        //     required: true,
        //     message: "Please enter your PHILHEALTH number.",
        // },
    ],
    sss: [
        // {
        //     required: true,
        //     message: "Please enter your SSS number.",
        // },
    ],
    tin: [
        // {
        //     required: true,
        //     message: "Please enter your TIN number.",
        // },
    ],
}

//   const imageUploadProps = {
//     name: "file",
//     multiple: true,
//     listType: "picture-card",
//     showUploadList: false,
//     action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   };