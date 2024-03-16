import { z } from "zod";

const documents = [
  {
    id: "AcceptanceLetter",
    label: "Acceptance Letter",
    description:
      "The official document issued by the university confirming your acceptance for admission. It outlines essential details regarding your enrollment, program of study, and other pertinent information.",
  },
  {
    id: "AcademicCertificates",
    label: "Academic Certificates",
    description:
      "These are certificates or diplomas obtained from previous educational institutions, such as high school or secondary school. They validate your academic achievements and qualifications.",
  },
  {
    id: "Transcripts",
    label: "Transcripts",
    description:
      "Official transcripts contain a record of your academic performance, including grades and courses completed, from previous educational institutions. They provide a comprehensive overview of your academic history.",
  },
  {
    id: "BirthCertificate",
    label: "Birth Certificate",
    description:
      " A legal document issued by a government authority that certifies your date and place of birth. It serves as proof of identity and is often required for various administrative purposes, including enrollment in educational institutions.",
  },
  {
    id: "PassportPhotos",
    label: "Passport Size Photographs",
    description:
      "Small-sized photographs typically used for official identification purposes, such as student IDs, passports, and other official documents. They should meet specific size and quality requirements as per the institution's guidelines.",
  },
  {
    id: "BankSlips",
    label: "Bank Slips for Fees Payment",
    description:
      "Bank slips or receipts confirming payment of tuition fees and other associated expenses. They serve as proof of payment and are necessary for completing the financial aspect of the enrollment process.",
  },
] as const;

const medicalCheckUp = [
  { id: "MedicalFormDownload", label: "Download Medical Examination Form" },
];

const DocumentsSchema = z.object({
  documents: z.array(z.string()).refine((value) => value.length === 6, {
    message: "Please ensure you have selected all required documents.",
  }),
  medicalCheckUp: z.array(z.string()).refine((value) => value.length === 1, {
    message: "Please ensure you have downloaded the medical examination form.",
  }),
});

export { DocumentsSchema, documents, medicalCheckUp };
