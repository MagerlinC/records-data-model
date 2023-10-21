import React from "react";
import styled from "styled-components";
import { ITSystemWithDataByPA } from "../data/types/pa-source-of-truth";
import AddButton from "./AddButton";
import RemovableElement from "./RemovableElement";

const VendorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  color: black;
  background-color: #f5f5f5f5;
`;
const VendorItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 8px;
`;

const VendorGrid = styled.div`
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

type VendorProps = {
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
const Vendor: React.FC<VendorProps> = ({
  itSystems,
  addDataSubject,
  addPersonalData,
  removeITSystem,
  removeDataSubject,
  removePersonalData,
}) => {
  return (
    <VendorWrapper>
      <h2>Victor cares about Vendors</h2>
      <ScrollWrapper>
        <VendorGrid>
          {itSystems.map((itSystem) => (
            <VendorItem key={itSystem.name}>
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
            </VendorItem>
          ))}
        </VendorGrid>
      </ScrollWrapper>
    </VendorWrapper>
  );
};
export default Vendor;
