import { Text, useToast } from "@chakra-ui/react";
import { CaretDoubleDown, FilePng } from "phosphor-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./DragNDrop.module.css";

interface DragNDropProps {
  file: FileTypes | undefined;
  setFile: (file: FileTypes) => void;
  label: string;
}

export interface FileTypes {
  //tem outras 2 propriedades
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

const fileTypes = ["PNG"];

export default function DragNDrop(props: DragNDropProps) {
  const { file, setFile, label } = props;
  const toast = useToast();

  const onTypeError = () => {
    return toast({
      title: "Tipo de arquivo não suportado",
      position: "bottom-right",
      isClosable: true,
      variant: "left-accent",
      status: "error",
    });
  };

  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      label={label}
      onTypeError={onTypeError}
      hoverTitle={<CaretDoubleDown size={32} />}
      dropMessageStyle={{ backgroundColor: "#bee3f8" }}
    >
      <div className={styles.dragdrop}>
        <FilePng size={32} />
        <Text>
          {file?.name
            ? file.name.substring(0, 25) + "..."
            : "Arraste e solte a logo do evento"}
        </Text>
      </div>
    </FileUploader>
  );
}
