import { ApplicantProgram } from "@/types/application";
import z from "zod";

interface SelectableOption {
  value: string;
  label: string;
}

const phoneRegex = /^\+\d{3}\d{6,9}$/;

const nationalities: SelectableOption[] = [
  { value: "af", label: "Afghan" },
  { value: "al", label: "Albanian" },
  { value: "dz", label: "Algerian" },
  { value: "ad", label: "Andorran" },
  { value: "ao", label: "Angolan" },
  { value: "ag", label: "Antiguan or Barbudan" },
  { value: "ar", label: "Argentine" },
  { value: "am", label: "Armenian" },
  { value: "au", label: "Australian" },
  { value: "at", label: "Austrian" },
  { value: "az", label: "Azerbaijani" },
  { value: "bs", label: "Bahamian" },
  { value: "bh", label: "Bahraini" },
  { value: "bd", label: "Bangladeshi" },
  { value: "bb", label: "Barbadian" },
  { value: "by", label: "Belarusian" },
  { value: "be", label: "Belgian" },
  { value: "bz", label: "Belizean" },
  { value: "bj", label: "Beninese" },
  { value: "bt", label: "Bhutanese" },
  { value: "bo", label: "Bolivian" },
  { value: "ba", label: "Bosnian" },
  { value: "bw", label: "Botswanan" },
  { value: "br", label: "Brazilian" },
  { value: "bn", label: "Bruneian" },
  { value: "bg", label: "Bulgarian" },
  { value: "bf", label: "Burkinese" },
  { value: "mm", label: "Burmese" },
  { value: "bi", label: "Burundian" },
  { value: "kh", label: "Cambodian" },
  { value: "cm", label: "Cameroonian" },
  { value: "ca", label: "Canadian" },
  { value: "cv", label: "Cape Verdean" },
  { value: "td", label: "Chadian" },
  { value: "cl", label: "Chilean" },
  { value: "cn", label: "Chinese" },
  { value: "co", label: "Colombian" },
  { value: "cg", label: "Congolese" },
  { value: "cr", label: "Costa Rican" },
  { value: "hr", label: "Croatian" },
  { value: "cu", label: "Cuban" },
  { value: "cy", label: "Cypriot" },
  { value: "cz", label: "Czech" },
  { value: "dk", label: "Danish" },
  { value: "dj", label: "Djiboutian" },
  { value: "do", label: "Dominican" },
  { value: "ec", label: "Ecuadorean" },
  { value: "eg", label: "Egyptian" },
  { value: "sv", label: "Salvadorean" },
  { value: "gb", label: "English" },
  { value: "er", label: "Eritrean" },
  { value: "ee", label: "Estonian" },
  { value: "et", label: "Ethiopian" },
  { value: "fj", label: "Fijian" },
  { value: "fi", label: "Finnish" },
  { value: "fr", label: "French" },
  { value: "ga", label: "Gabonese" },
  { value: "gm", label: "Gambian" },
  { value: "ge", label: "Georgian" },
  { value: "de", label: "German" },
  { value: "gh", label: "Ghanaian" },
  { value: "gr", label: "Greek" },
  { value: "gd", label: "Grenadian" },
  { value: "gt", label: "Guatemalan" },
  { value: "gn", label: "Guinean" },
  { value: "gy", label: "Guyanese" },
  { value: "ht", label: "Haitian" },
  { value: "hn", label: "Honduran" },
  { value: "hu", label: "Hungarian" },
  { value: "is", label: "Icelander" },
  { value: "in", label: "Indian" },
  { value: "id", label: "Indonesian" },
  { value: "ir", label: "Iranian" },
  { value: "iq", label: "Iraqi" },
  { value: "ie", label: "Irish" },
  { value: "il", label: "Israeli" },
  { value: "it", label: "Italian" },
  { value: "jm", label: "Jamaican" },
  { value: "jp", label: "Japanese" },
  { value: "jo", label: "Jordanian" },
  { value: "kz", label: "Kazakh" },
  { value: "ke", label: "Kenyan" },
  { value: "kw", label: "Kuwaiti" },
  { value: "la", label: "Laotian" },
  { value: "lv", label: "Latvian" },
  { value: "lb", label: "Lebanese" },
  { value: "lr", label: "Liberian" },
  { value: "lt", label: "Lithuanian" },
  { value: "lu", label: "Luxembourger" },
  { value: "mk", label: "Macedonian" },
  { value: "mg", label: "Malagasy" },
  { value: "mw", label: "Malawian" },
  { value: "my", label: "Malaysian" },
  { value: "mv", label: "Maldivian" },
  { value: "ml", label: "Malian" },
  { value: "mt", label: "Maltese" },
  { value: "mr", label: "Mauritanian" },
  { value: "mu", label: "Mauritian" },
  { value: "mx", label: "Mexican" },
  { value: "md", label: "Moldovan" },
  { value: "mc", label: "Monacan" },
  { value: "mn", label: "Mongolian" },
  { value: "me", label: "Montenegrin" },
  { value: "ma", label: "Moroccan" },
  { value: "mz", label: "Mozambican" },
  { value: "na", label: "Namibian" },
  { value: "np", label: "Nepalese" },
  { value: "nl", label: "Dutch" },
  { value: "nz", label: "New Zealander" },
  { value: "ni", label: "Nicaraguan" },
  { value: "ne", label: "Nigerien" },
  { value: "ng", label: "Nigerian" },
  { value: "kp", label: "North Korean" },
  { value: "no", label: "Norwegian" },
  { value: "om", label: "Omani" },
  { value: "pk", label: "Pakistani" },
  { value: "pa", label: "Panamanian" },
  { value: "pg", label: "Papua New Guinean" },
  { value: "py", label: "Paraguayan" },
  { value: "pe", label: "Peruvian" },
  { value: "ph", label: "Filipino" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese" },
  { value: "qa", label: "Qatari" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "rw", label: "Rwandan" },
  { value: "kn", label: "Saint Kitts and Nevis" },
  { value: "lc", label: "Saint Lucian" },
  { value: "vc", label: "Saint Vincent and the Grenadines" },
  { value: "ws", label: "Samoan" },
  { value: "sm", label: "San Marinese" },
  { value: "st", label: "Sao Tomean" },
  { value: "sa", label: "Saudi" },
  { value: "sn", label: "Senegalese" },
  { value: "rs", label: "Serbian" },
  { value: "sc", label: "Seychellois" },
  { value: "sl", label: "Sierra Leonean" },
  { value: "sg", label: "Singaporean" },
  { value: "sk", label: "Slovak" },
  { value: "si", label: "Slovenian" },
  { value: "so", label: "Somali" },
  { value: "za", label: "South African" },
  { value: "kr", label: "South Korean" },
  { value: "es", label: "Spanish" },
  { value: "lk", label: "Sri Lankan" },
  { value: "sd", label: "Sudanese" },
  { value: "sr", label: "Surinamese" },
  { value: "sz", label: "Swazi" },
  { value: "se", label: "Swedish" },
  { value: "ch", label: "Swiss" },
  { value: "sy", label: "Syrian" },
  { value: "tw", label: "Taiwanese" },
  { value: "tj", label: "Tajik" },
  { value: "tz", label: "Tanzanian" },
  { value: "th", label: "Thai" },
  { value: "tg", label: "Togolese" },
  { value: "to", label: "Tongan" },
  { value: "tt", label: "Trinidadian or Tobagonian" },
  { value: "tn", label: "Tunisian" },
  { value: "tr", label: "Turkish" },
  { value: "tm", label: "Turkmen" },
  { value: "tv", label: "Tuvaluan" },
  { value: "ug", label: "Ugandan" },
  { value: "ua", label: "Ukrainian" },
  { value: "ae", label: "Emirati" },
  { value: "us", label: "American" },
  { value: "uy", label: "Uruguayan" },
  { value: "uz", label: "Uzbekistani" },
  { value: "vu", label: "Vanuatuan" },
  { value: "va", label: "Vatican" },
  { value: "ve", label: "Venezuelan" },
  { value: "vn", label: "Vietnamese" },
  { value: "ye", label: "Yemeni" },
  { value: "zm", label: "Zambian" },
  { value: "zw", label: "Zimbabwean" },
];

const countries: SelectableOption[] = [
  { value: "af", label: "Afghanistan" },
  { value: "al", label: "Albania" },
  { value: "dz", label: "Algeria" },
  { value: "as", label: "American Samoa" },
  { value: "ad", label: "Andorra" },
  { value: "ao", label: "Angola" },
  { value: "ai", label: "Anguilla" },
  { value: "aq", label: "Antarctica" },
  { value: "ag", label: "Antigua and Barbuda" },
  { value: "ar", label: "Argentina" },
  { value: "am", label: "Armenia" },
  { value: "aw", label: "Aruba" },
  { value: "au", label: "Australia" },
  { value: "at", label: "Austria" },
  { value: "az", label: "Azerbaijan" },
  { value: "bs", label: "Bahamas" },
  { value: "bh", label: "Bahrain" },
  { value: "bd", label: "Bangladesh" },
  { value: "bb", label: "Barbados" },
  { value: "by", label: "Belarus" },
  { value: "be", label: "Belgium" },
  { value: "bz", label: "Belize" },
  { value: "bj", label: "Benin" },
  { value: "bm", label: "Bermuda" },
  { value: "bt", label: "Bhutan" },
  { value: "bo", label: "Bolivia" },
  { value: "ba", label: "Bosnia and Herzegovina" },
  { value: "bw", label: "Botswana" },
  { value: "bv", label: "Bouvet Island" },
  { value: "br", label: "Brazil" },
  { value: "io", label: "British Indian Ocean Territory" },
  { value: "bn", label: "Brunei Darussalam" },
  { value: "bg", label: "Bulgaria" },
  { value: "bf", label: "Burkina Faso" },
  { value: "bi", label: "Burundi" },
  { value: "kh", label: "Cambodia" },
  { value: "cm", label: "Cameroon" },
  { value: "ca", label: "Canada" },
  { value: "cv", label: "Cape Verde" },
  { value: "ky", label: "Cayman Islands" },
  { value: "cf", label: "Central African Republic" },
  { value: "td", label: "Chad" },
  { value: "cl", label: "Chile" },
  { value: "cn", label: "China" },
  { value: "cx", label: "Christmas Island" },
  { value: "cc", label: "Cocos (Keeling) Islands" },
  { value: "co", label: "Colombia" },
  { value: "km", label: "Comoros" },
  { value: "cg", label: "Congo" },
  { value: "cd", label: "Congo, The Democratic Republic of The" },
  { value: "ck", label: "Cook Islands" },
  { value: "cr", label: "Costa Rica" },
  { value: "ci", label: "Cote D'ivoire" },
  { value: "hr", label: "Croatia" },
  { value: "cu", label: "Cuba" },
  { value: "cy", label: "Cyprus" },
  { value: "cz", label: "Czech Republic" },
  { value: "dk", label: "Denmark" },
  { value: "dj", label: "Djibouti" },
  { value: "dm", label: "Dominica" },
  { value: "do", label: "Dominican Republic" },
  { value: "ec", label: "Ecuador" },
  { value: "eg", label: "Egypt" },
  { value: "sv", label: "El Salvador" },
  { value: "gq", label: "Equatorial Guinea" },
  { value: "er", label: "Eritrea" },
  { value: "ee", label: "Estonia" },
  { value: "et", label: "Ethiopia" },
  { value: "fk", label: "Falkland Islands (Malvinas)" },
  { value: "fo", label: "Faroe Islands" },
  { value: "fj", label: "Fiji" },
  { value: "fi", label: "Finland" },
  { value: "fr", label: "France" },
  { value: "gf", label: "French Guiana" },
  { value: "pf", label: "French Polynesia" },
  { value: "tf", label: "French Southern Territories" },
  { value: "ga", label: "Gabon" },
  { value: "gm", label: "Gambia" },
  { value: "ge", label: "Georgia" },
  { value: "de", label: "Germany" },
  { value: "gh", label: "Ghana" },
  { value: "gi", label: "Gibraltar" },
  { value: "gr", label: "Greece" },
  { value: "gl", label: "Greenland" },
  { value: "gd", label: "Grenada" },
  { value: "gp", label: "Guadeloupe" },
  { value: "gu", label: "Guam" },
  { value: "gt", label: "Guatemala" },
  { value: "gg", label: "Guernsey" },
  { value: "gn", label: "Guinea" },
  { value: "gw", label: "Guinea-bissau" },
  { value: "gy", label: "Guyana" },
  { value: "ht", label: "Haiti" },
  { value: "hm", label: "Heard Island and Mcdonald Islands" },
  { value: "va", label: "Holy See (Vatican City State)" },
  { value: "hn", label: "Honduras" },
  { value: "hk", label: "Hong Kong" },
  { value: "hu", label: "Hungary" },
  { value: "is", label: "Iceland" },
  { value: "in", label: "India" },
  { value: "id", label: "Indonesia" },
  { value: "ir", label: "Iran, Islamic Republic of" },
  { value: "iq", label: "Iraq" },
  { value: "ie", label: "Ireland" },
  { value: "im", label: "Isle of Man" },
  { value: "il", label: "Israel" },
  { value: "it", label: "Italy" },
  { value: "jm", label: "Jamaica" },
  { value: "jp", label: "Japan" },
  { value: "je", label: "Jersey" },
  { value: "jo", label: "Jordan" },
  { value: "kz", label: "Kazakhstan" },
  { value: "ke", label: "Kenya" },
  { value: "ki", label: "Kiribati" },
  { value: "kp", label: "Korea, Democratic People's Republic of" },
  { value: "kr", label: "Korea, Republic of" },
  { value: "kw", label: "Kuwait" },
  { value: "kg", label: "Kyrgyzstan" },
  { value: "la", label: "Lao People's Democratic Republic" },
  { value: "lv", label: "Latvia" },
  { value: "lb", label: "Lebanon" },
  { value: "ls", label: "Lesotho" },
  { value: "lr", label: "Liberia" },
  { value: "ly", label: "Libyan Arab Jamahiriya" },
  { value: "li", label: "Liechtenstein" },
  { value: "lt", label: "Lithuania" },
  { value: "lu", label: "Luxembourg" },
  { value: "mo", label: "Macao" },
  { value: "mk", label: "Macedonia, The Former Yugoslav Republic of" },
  { value: "mg", label: "Madagascar" },
  { value: "mw", label: "Malawi" },
  { value: "my", label: "Malaysia" },
  { value: "mv", label: "Maldives" },
  { value: "ml", label: "Mali" },
  { value: "mt", label: "Malta" },
  { value: "mh", label: "Marshall Islands" },
  { value: "mq", label: "Martinique" },
  { value: "mr", label: "Mauritania" },
  { value: "mu", label: "Mauritius" },
  { value: "yt", label: "Mayotte" },
  { value: "mx", label: "Mexico" },
  { value: "fm", label: "Micronesia, Federated States of" },
  { value: "md", label: "Moldova, Republic of" },
  { value: "mc", label: "Monaco" },
  { value: "mn", label: "Mongolia" },
  { value: "me", label: "Montenegro" },
  { value: "ms", label: "Montserrat" },
  { value: "ma", label: "Morocco" },
  { value: "mz", label: "Mozambique" },
  { value: "mm", label: "Myanmar" },
  { value: "na", label: "Namibia" },
  { value: "nr", label: "Nauru" },
  { value: "np", label: "Nepal" },
  { value: "nl", label: "Netherlands" },
  { value: "an", label: "Netherlands Antilles" },
  { value: "nc", label: "New Caledonia" },
  { value: "nz", label: "New Zealand" },
  { value: "ni", label: "Nicaragua" },
  { value: "ne", label: "Niger" },
  { value: "ng", label: "Nigeria" },
  { value: "nu", label: "Niue" },
  { value: "nf", label: "Norfolk Island" },
  { value: "mp", label: "Northern Mariana Islands" },
  { value: "no", label: "Norway" },
  { value: "om", label: "Oman" },
  { value: "pk", label: "Pakistan" },
  { value: "pw", label: "Palau" },
  { value: "ps", label: "Palestinian Territory, Occupied" },
  { value: "pa", label: "Panama" },
  { value: "pg", label: "Papua New Guinea" },
  { value: "py", label: "Paraguay" },
  { value: "pe", label: "Peru" },
  { value: "ph", label: "Philippines" },
  { value: "pn", label: "Pitcairn" },
  { value: "pl", label: "Poland" },
  { value: "pt", label: "Portugal" },
  { value: "pr", label: "Puerto Rico" },
  { value: "qa", label: "Qatar" },
  { value: "re", label: "Reunion" },
  { value: "ro", label: "Romania" },
  { value: "ru", label: "Russian Federation" },
  { value: "rw", label: "Rwanda" },
  { value: "sh", label: "Saint Helena" },
  { value: "kn", label: "Saint Kitts and Nevis" },
  { value: "lc", label: "Saint Lucia" },
  { value: "pm", label: "Saint Pierre and Miquelon" },
  { value: "vc", label: "Saint Vincent and The Grenadines" },
  { value: "ws", label: "Samoa" },
  { value: "sm", label: "San Marino" },
  { value: "st", label: "Sao Tome and Principe" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "sn", label: "Senegal" },
  { value: "rs", label: "Serbia" },
  { value: "sc", label: "Seychelles" },
  { value: "sl", label: "Sierra Leone" },
  { value: "sg", label: "Singapore" },
  { value: "sk", label: "Slovakia" },
  { value: "si", label: "Slovenia" },
  { value: "sb", label: "Solomon Islands" },
  { value: "so", label: "Somalia" },
  { value: "za", label: "South Africa" },
  { value: "gs", label: "South Georgia and The South Sandwich Islands" },
  { value: "es", label: "Spain" },
  { value: "lk", label: "Sri Lanka" },
  { value: "sd", label: "Sudan" },
  { value: "sr", label: "Suriname" },
  { value: "sj", label: "Svalbard and Jan Mayen" },
  { value: "sz", label: "Swaziland" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "sy", label: "Syrian Arab Republic" },
  { value: "tw", label: "Taiwan, Province of China" },
  { value: "tj", label: "Tajikistan" },
  { value: "tz", label: "Tanzania, United Republic of" },
  { value: "th", label: "Thailand" },
  { value: "tl", label: "Timor-leste" },
  { value: "tg", label: "Togo" },
  { value: "tk", label: "Tokelau" },
  { value: "to", label: "Tonga" },
  { value: "tt", label: "Trinidad and Tobago" },
  { value: "tn", label: "Tunisia" },
  { value: "tr", label: "Turkey" },
  { value: "tm", label: "Turkmenistan" },
  { value: "tc", label: "Turks and Caicos Islands" },
  { value: "tv", label: "Tuvalu" },
  { value: "ug", label: "Uganda" },
  { value: "ua", label: "Ukraine" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "um", label: "United States Minor Outlying Islands" },
  { value: "uy", label: "Uruguay" },
  { value: "uz", label: "Uzbekistan" },
  { value: "vu", label: "Vanuatu" },
  { value: "ve", label: "Venezuela" },
  { value: "vn", label: "Viet Nam" },
  { value: "vg", label: "Virgin Islands, British" },
  { value: "vi", label: "Virgin Islands, U.S." },
  { value: "wf", label: "Wallis and Futuna" },
  { value: "eh", label: "Western Sahara" },
  { value: "ye", label: "Yemen" },
  { value: "zm", label: "Zambia" },
  { value: "zw", label: "Zimbabwe" },
];

const genders: SelectableOption[] = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

const educationLevel: SelectableOption[] = [
  { value: "secondary_education", label: "Secondary Education" },
  { value: "nva_level_3_veta", label: "NVA Level 3 - Veta" },
  { value: "postgraduate_certificate", label: "Postgraduate Certificate" },
  { value: "postgraduate_diploma", label: "Postgraduate Diploma" },
  { value: "bachelors_degree", label: "Bachelor's Degree" },
  { value: "masters_degree", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
];

const maritalStatusOptions: SelectableOption[] = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "separated", label: "Separated" },
];

const EducationSchema = z.object({
  _id: z.string(),
  position: z.number(),
  level: z.string().min(1, { message: "Level of education is required" }),
  schoolName: z
    .string()
    .min(1, { message: "Official name of school / university is required" }),
  startYear: z
    .string()
    .min(1, { message: "Issue date/Start date is required" }),
  endYear: z
    .string()
    .min(1, { message: "(Expected) graduation date is required" }),
});

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().min(1, { message: "Last name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  nida: z.string().min(1, { message: "NIDA number is required" }),
  gender: z.string().min(1, { message: "Please select your gender." }),
  maritalStatus: z
    .string()
    .min(1, { message: "Please select your marital status." }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Please provide your date of birth." }),
  placeOfBirth: z
    .string()
    .min(1, { message: "Please provide your place of birth." }),
  disability: z.string().optional(),
  citizenship: z
    .string()
    .min(1, { message: "Please select your nationality." }),

  applicantEmail: z
    .string()
    .email({
      message: "Applicant's email must be in a valid format.",
    })
    .optional()
    .or(z.literal("")),

  applicantAlternativeEmail: z
    .string()
    .email({
      message: "Applicant's alternative email must be in a valid format.",
    })
    .optional()
    .or(z.literal("")),

  applicantPhoneNumber: z.string().refine((value) => phoneRegex.test(value), {
    message: "Applicant's phone number must be in a valid format.",
  }),

  applicantAlternativePhoneNumber: z
    .string()
    .refine((value) => phoneRegex.test(value), {
      message:
        "Applicant's alternative phone number must be in a valid format.",
    })
    .optional()
    .or(z.literal("")),

  streetAddress: z.string().min(1, { message: "Street address is required." }),

  city: z.string().min(1, { message: "City is required." }),

  region: z.string().min(1, { message: "Region is required." }),

  postalCode: z.string().min(1, { message: "Postal code is required." }),

  country: z.string().min(1, { message: "Country is required." }),

  emergencyContactEmail: z
    .string()
    .email({
      message: "Emergency contact's email must be in a valid format.",
    })
    .optional()
    .or(z.literal("")),

  emergencyContactAlternativeEmail: z
    .string()
    .email({
      message:
        "Emergency contact's alternative email must be in a valid format.",
    })
    .optional()
    .or(z.literal("")),

  emergencyContactFullName: z
    .string()
    .min(1, { message: "Emergency contact full name is required" }),

  emergencyContactPhoneNumber: z
    .string()
    .refine((value) => phoneRegex.test(value), {
      message: "Emergency contact's phone number must be in a valid format.",
    }),

  emergencyContactAlternativePhoneNumber: z
    .string()
    .refine((value) => phoneRegex.test(value), {
      message:
        "Emergency contact's alternative phone number must be in a valid format.",
    })
    .optional()
    .or(z.literal("")),

  emergencyContactStreetAddress: z
    .string()
    .min(1, { message: "Street address is required." }),

  emergencyContactCity: z.string().min(1, { message: "City is required." }),

  emergencyContactRegion: z.string().min(1, { message: "Region is required." }),

  emergencyContactPostalCode: z
    .string()
    .min(1, { message: "Postal code is required." }),

  emergencyContactCountry: z
    .string()
    .min(1, { message: "Country is required." }),

  emergencyContactRelation: z
    .string()
    .min(1, { message: "Relationship to the emergency contact is required." }),

  education: z.array(EducationSchema),
});

export interface ApplicantFormData {
  formData: z.infer<typeof FormSchema>;
  applicantProgrammes: ApplicantProgram[];
}

const ImageSchema = z.object({
  image: z
    .any()
    .optional()
    .nullable()
    .refine((file) => file && file.size <= 100 * 1024, {
      message: "Image should be less than 100KB",
    }),
});

const EducationFileSchema = z.object({
  file: z
    .any()
    .optional()
    .nullable()
    .refine((file) => file && file.size <= 10 * 1024 * 1024, {
      message: "File should be less than 10MB",
    })
    .refine(
      (file) => {
        const validTypes = [
          "image/jpeg",
          "image/jpg",
          "image/gif",
          "image/png",
          "image/tif",
          "application/pdf",
        ];
        return file && validTypes.includes(file.type);
      },
      {
        message:
          "Invalid file type. Only JPEG, JPG, GIF, PNG, TIF, and PDF are allowed.",
      },
    ),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => {
  const year = i + 1970;
  return { value: year.toString(), label: year.toString() };
});

export {
  countries,
  genders,
  nationalities,
  years,
  educationLevel,
  FormSchema,
  ImageSchema,
  EducationFileSchema,
  maritalStatusOptions,
};
