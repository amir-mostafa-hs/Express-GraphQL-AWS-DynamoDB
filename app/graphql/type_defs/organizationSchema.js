const organizationSchema = `#graphql
type Organization{
    uId: ID
    isOrganization: Boolean
    organization: String,
    organizationId: ID,
    organizationLibrary: [Library]
    members: [Member]
}

type Library {
    id: ID,
    shareId: ID,
    assignmentId: ID,
    title: String,
    type: String,
    desc: String,
    dueDate: Boolean,
    totalGrade: Int,
    grade: Int,
    resubmission: Boolean,
    author: String,
    timeStamp: Int
}

type Member {
    id: ID,
    personalShareId: ID,
}

type Query {
    organizations: [Organization]
    libraries: [Library]
    members: [Member]
}
`;

module.exports = organizationSchema;
