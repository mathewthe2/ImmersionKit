import { useContext } from "react";
import { Box } from "@chakra-ui/react";
import {
  MdOutlineViewList,
  MdOutlineViewStream,
  MdOutlineCalendarViewMonth,
} from "react-icons/md";
import { IconButton } from "@chakra-ui/react";
import SearchContext from "context/search/SearchContext"

function OrientationSwitch({ updateSentencesView }) {
  const { sentencesView } = useContext(SearchContext);

  const views = [
    {
      name: "list",
      icon: <MdOutlineViewList />,
    },
    {
      name: "calendar",
      icon: <MdOutlineCalendarViewMonth />,
    },
    {
      name: "stream",
      icon: <MdOutlineViewStream />,
    },
  ];
  return (
    <Box mt="2" mb="2">
      {views.map((view, index) => (
        <IconButton
          isRound
          key={`iconButton_${index}`}
          disabled={sentencesView === view.name}
          onClick={() => updateSentencesView(view.name)}
          size="lg"
          aria-label="Search database"
          icon={view.icon}
          variant="ghost"
        />
      ))}
    </Box>
  );
}

export default OrientationSwitch;
