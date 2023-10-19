import React from "react";
import styled from "styled-components";
import { ProcessingActivitySource } from "../data/types/pa-source-of-truth";
import AnimateOnChange from "./AnimateOnChange";

const DPOWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  border-color: 1px solid #ebebebeb;
  color: black;
  background-color: #f5f5f5f5;

  .pa-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const ProcessingActivity = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
`;

const FlexHalf = styled.div`
  display: flex;
  flex-direction: column;
`;

type DPOProps = {
  processingActivities: ProcessingActivitySource[];
};
const DPO: React.FC<DPOProps> = ({ processingActivities }) => {
  return (
    <DPOWrapper>
      <h2>David the DPO cares about Processing Activities</h2>
      <div className={"pa-list"}>
        {processingActivities.map((processingActivity) => (
          <ProcessingActivity>
            <h3>{processingActivity.name}</h3>
            <Row>
              <FlexHalf>
                <h4>IT systems</h4>
                <ul>
                  {processingActivity.itSystems.map((itSystem) => (
                    <li>
                      <AnimateOnChange>{itSystem.name}</AnimateOnChange>
                    </li>
                  ))}
                </ul>
              </FlexHalf>
              <FlexHalf>
                <h4>Data Subjects</h4>
                <ul>
                  {processingActivity.dataSubjects.map((dataSubject) => (
                    <li>
                      <AnimateOnChange>{dataSubject.name}</AnimateOnChange>
                      <ul>
                        {dataSubject.personalData.map((personalData) => (
                          <li>
                            <AnimateOnChange>
                              {personalData.name}
                            </AnimateOnChange>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </FlexHalf>
            </Row>
          </ProcessingActivity>
        ))}
      </div>
    </DPOWrapper>
  );
};
export default DPO;
