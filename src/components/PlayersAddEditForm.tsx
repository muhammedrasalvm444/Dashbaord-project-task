import {
  leagueOptions,
  PlayingStatus,
  statusOptions,
} from "../utils/constants";
import Button from "./Fields/Button";
import CustomSelect from "./Fields/CustomSelect";
import TextBox from "./Fields/Textbox";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayer,
  editPlayer,
  getActiveMode,
  getPlayersList,
  getSingleSelctedItem,
  setMode,
} from "../redux/playersSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PlayersAddEditForm = () => {
  const dispatch = useDispatch();
  const playersList = useSelector(getPlayersList);
  const singleData = useSelector(getSingleSelctedItem);
  const mode = useSelector(getActiveMode);

  const [playerData, setPlayerData] = useState<any>({
    id: playersList?.length + 1,
    user: "",
    age: "",
    leagues: [],
    status: "",
    height: "",
    position: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPlayerData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | string[]) => {
    setPlayerData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the  fields are filled
    if (
      playerData?.leagues?.length === 0 ||
      playerData?.status === "" ||
      playerData?.position === "" ||
      playerData?.age === "" ||
      playerData?.user === "" ||
      playerData?.height === ""
    ) {
      toast.error("Please fill in all fields");
    } else {
      if (mode == "modify") {
        dispatch(editPlayer(playerData));
        dispatch(setMode("view"));
        toast.success("Modifed successfully");
        // Reset the form data
        setPlayerData({
          id: playersList?.length + 1,
          user: "",
          age: "",
          leagues: [],
          status: "",
          height: "",
          position: "",
        });
      } else {
        // Dispatch actions if the form is valid
        dispatch(addPlayer(playerData));
        dispatch(setMode("view"));
        toast.success("Added successfully");

        // Reset the form data
        setPlayerData({
          id: playersList?.length + 1,
          user: "",
          age: "",
          leagues: [],
          status: "",
          height: "",
          position: "",
        });
      }
    }
  };
  useEffect(() => {
    if (singleData) {
      setPlayerData(singleData);
    }
  }, [singleData]);

  return (
    <form onSubmit={handleSubmit} style={{ width: "41rem", margin: "2rem 0" }}>
      <div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <TextBox
            name="user"
            value={playerData.user}
            onChange={handleChange}
            width="20rem"
            label="Name"
            placeholder="Name"
          />
          <TextBox
            name="age"
            value={playerData.age}
            onChange={handleChange}
            width="20rem"
            placeholder="Age"
            label="Age"
            type="number" // Adding type="number" for age field
          />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <CustomSelect
            name="leagues"
            width="20rem"
            options={leagueOptions}
            value={playerData.leagues}
            onChange={(value) => handleSelectChange("leagues", value)}
            isMulti
            label="Leagues"
          />
          <CustomSelect
            name="status"
            width="20rem"
            options={PlayingStatus}
            value={playerData.status}
            onChange={(value) => handleSelectChange("status", value)}
            label="Status"
          />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <TextBox
            name="height"
            value={playerData.height}
            onChange={handleChange}
            width="20rem"
            placeholder="Height"
            label="Height"
          />
          <CustomSelect
            name="position"
            width="20rem"
            options={statusOptions}
            value={playerData.position}
            onChange={(value) => handleSelectChange("position", value)}
            label="Position"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "flex-end",
        }}
      >
        <Button label="Submit" type="submit" />
      </div>
    </form>
  );
};

export default PlayersAddEditForm;
