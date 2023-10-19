import React from "react";
import styled from "styled-components";
import { ITSystemWithDataByPA } from "../data/types/pa-source-of-truth";
import AddButton from "./AddButton";
import RemovableElement from "./RemovableElement";

const SysAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  color: black;
  background-color: #f5f5f5f5;
`;
const ITSystem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 8px;
`;

const ITSystemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
`;

const ScrollWrapper = styled.div`
  overflow-y: scroll;
  max-height: 85vh;
`;

type SysAdminProps = {
  itSystems: ITSystemWithDataByPA[];
  addDataSubject: (dataSubjectName: string, paName: string) => void;
  addPersonalData: (
    personalDataName: string,
    dataSubjectName: string,
    paName: string
  ) => void;
  removeITSystem: (itSystemName: string, paName: string) => void;
  removeDataSubject: (dataSubjectName: string, paName: string) => void;
  removePersonalData: (
    personalDataName: string,
    dataSubjectName: string,
    paName: string
  ) => void;
};
const SysAdmin: React.FC<SysAdminProps> = ({
  itSystems,
  addDataSubject,
  addPersonalData,
  removeITSystem,
  removeDataSubject,
  removePersonalData,
}) => {
  return (
    <SysAdminWrapper>
      <h2>Simon the SysAdmin cares about IT Systems</h2>
      <ScrollWrapper>
        <ITSystemGrid>
          {itSystems.map((itSystem) => (
            <ITSystem key={itSystem.name}>
              <Row>
                <h3>{itSystem.name}</h3>
              </Row>
              {itSystem.processingActivities.length > 0 && (
                <>
                  <h4>Personal Data</h4>
                  <ul>
                    {itSystem.processingActivities.map((processingActivity) => (
                      <li key={"pa-" + processingActivity.name}>
                        <RemovableElement
                          name={processingActivity.name}
                          onRemove={() =>
                            removeITSystem(
                              itSystem.name,
                              processingActivity.name
                            )
                          }
                        />
                        <ul>
                          <li>
                            <AddButton
                              onAddItem={(dsName) =>
                                addDataSubject(dsName, processingActivity.name)
                              }
                              text="Add Data Subject"
                            />
                          </li>
                          {processingActivity.dataSubjects.map(
                            (dataSubject) => (
                              <li key={"sysadmin-ds-" + dataSubject.name}>
                                <RemovableElement
                                  name={dataSubject.name}
                                  onRemove={() =>
                                    removeDataSubject(
                                      dataSubject.name,
                                      processingActivity.name
                                    )
                                  }
                                />
                                <ul>
                                  {dataSubject.personalData.map(
                                    (personalData) => (
                                      <li key={"pd-" + personalData.name}>
                                        <RemovableElement
                                          name={personalData.name}
                                          onRemove={() =>
                                            removePersonalData(
                                              personalData.name,
                                              dataSubject.name,
                                              processingActivity.name
                                            )
                                          }
                                        />
                                      </li>
                                    )
                                  )}
                                  <li>
                                    <AddButton
                                      onAddItem={(pdName) =>
                                        addPersonalData(
                                          pdName,
                                          dataSubject.name,
                                          processingActivity.name
                                        )
                                      }
                                      text="Add PD"
                                    />
                                  </li>
                                </ul>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </ITSystem>
          ))}
        </ITSystemGrid>
      </ScrollWrapper>
    </SysAdminWrapper>
  );
};
export default SysAdmin;
