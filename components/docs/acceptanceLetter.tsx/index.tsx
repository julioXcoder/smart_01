import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  logo: {
    width: 150,
    height: 75,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  content: {
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 24,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 24,
    paddingTop: 12,
    borderTop: 1,
    borderColor: "#CCCCCC",
  },
});

interface Props {
  studentName: string;
  programName: string;
  uniLogoSrc: string;
}

// Create Document Component
const AcceptanceLetter = ({ studentName, programName, uniLogoSrc }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* University Logo */}

      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image style={styles.logo} src={uniLogoSrc} />

      {/* <NextImage style={styles.logo} src={mustLogo} alt="must logo" /> */}

      {/* Letter Title */}
      <Text style={styles.title}>Must University Acceptance Letter</Text>

      {/* Letter Content */}
      <View style={styles.content}>
        <Text>Dear {studentName},</Text>
        <Text>
          It is with great pleasure that I extend to you an offer of admission
          to the {programName} program at Must University. Your exceptional
          academic achievements and demonstrated leadership have impressed our
          admissions committee.
        </Text>
        <Text>
          Enclosed, you will find detailed information regarding your admission
          and enrollment process. We are confident that you will contribute
          significantly to our academic community and thrive within our dynamic
          environment.
        </Text>
        <Text>
          Please do not hesitate to contact our office should you have any
          questions or require further assistance. We eagerly anticipate your
          arrival on campus and the contributions you will make to our
          prestigious institution.
        </Text>
        <Text>Warm regards,</Text>
        <Text>The Office of Admissions</Text>
        <Text>Must University</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Must University | Office of Admissions | Address | Contact Information
      </Text>
    </Page>
  </Document>
);

export default AcceptanceLetter;
