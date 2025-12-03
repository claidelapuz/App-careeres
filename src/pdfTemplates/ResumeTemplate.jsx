import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 4,
    borderBottomColor: '#2563eb',
    paddingBottom: 15,
    marginBottom: 20,
  },
  photoNameContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.6,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
  },
  company: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 9,
  },
  workExperienceItem: {
    marginBottom: 12,
  },
  educationItem: {
    marginBottom: 10,
  },
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  referenceItem: {
    width: '48%',
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    paddingLeft: 10,
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  referenceText: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 1,
  },
});

export default function Template1PDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.photoNameContainer}>
            {data.photo_url && (
              <Image src={data.photo_url} style={styles.photo} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{data.full_name}</Text>
              {data.email && <Text style={styles.contactInfo}>📧 {data.email}</Text>}
              {data.phone && <Text style={styles.contactInfo}>📱 {data.phone}</Text>}
              {data.address && <Text style={styles.contactInfo}>📍 {data.address}</Text>}
            </View>
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {data.work_experience && data.work_experience.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.work_experience.map((exp, idx) => (
              <View key={idx} style={styles.workExperienceItem}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.company}>{exp.company} | {exp.duration}</Text>
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, idx) => (
              <View key={idx} style={styles.educationItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.institution} | {edu.year}</Text>
                {edu.details && <Text style={styles.description}>{edu.details}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, idx) => (
                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.description}>{data.interests.join(', ')}</Text>
          </View>
        )}

        {/* References */}
        {data.professional_references && data.professional_references.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={styles.referenceGrid}>
              {data.professional_references.map((ref, idx) => (
                <View key={idx} style={styles.referenceItem}>
                  {ref.contactPerson && <Text style={styles.referenceName}>{ref.contactPerson}</Text>}
                  {ref.companyName && <Text style={styles.referenceText}>{ref.companyName}</Text>}
                  {ref.phoneNumber && <Text style={styles.referenceText}>📱 {ref.phoneNumber}</Text>}
                  {ref.emailAddress && <Text style={styles.referenceText}>📧 {ref.emailAddress}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}