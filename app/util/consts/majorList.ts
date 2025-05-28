export interface Major {
    label: string,
    value: string,
    color?: string,
    icon?: any,
}

const majors: Major[] = [
  { label: "Not go to college", value: "no_college", color: "red" },
  {
    label: "Computer Science",
    value: "computer_science",
    // icon: require("@/assets/images/react-logo.png"),
  },
  { label: "Business Administration", value: "business" },
  { label: "Engineering", value: "engineering" },
  { label: "Psychology", value: "psychology" },
  { label: "Biology", value: "biology" },
  { label: "Economics", value: "economics" },
  { label: "English Literature", value: "english" },
  { label: "Political Science", value: "political_science" },
  { label: "Mathematics", value: "mathematics" },
  { label: "Chemistry", value: "chemistry" },
];

export default majors;

