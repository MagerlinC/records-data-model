import React from "react";
import styled from "styled-components";
import { ITSystemWithDataByPA } from "../data/types/pa-source-of-truth";
import AnimateOnChange from "./AnimateOnChange";

const SysAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  border-color: 1px solid #ebebebeb;
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

const ITSystemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  max-height: 50vh;
  overflow-y: auto;
`;

type SysAdminProps = {
  itSystems: ITSystemWithDataByPA[];
};
const SysAdmin: React.FC<SysAdminProps> = ({ itSystems }) => {
  return (
    <SysAdminWrapper>
      <h2>Simon the SysAdmin cares about IT Systems</h2>
      <ITSystemList>
        {itSystems.map((itSystem) => (
          <ITSystem key={itSystem.name}>
            <h3>
              <AnimateOnChange>{itSystem.name}</AnimateOnChange>
            </h3>
            {itSystem.processingActivities.length > 0 && (
              <>
                <h4>Personal Data</h4>
                <ul>
                  {itSystem.processingActivities.map((pa) => (
                    <li key={"pa-" + pa.name}>
                      <AnimateOnChange>{pa.name}</AnimateOnChange>
                      <ul>
                        {pa.dataSubjects.map((dataSubject) => (
                          <li key={"sysadmin-ds-" + dataSubject.name}>
                            <AnimateOnChange>
                              {dataSubject.name}
                            </AnimateOnChange>
                            <ul>
                              {dataSubject.personalData.map((personalData) => (
                                <li key={"pd-" + personalData.name}>
                                  <AnimateOnChange>
                                    {personalData.name}
                                  </AnimateOnChange>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ITSystem>
        ))}
      </ITSystemList>
    </SysAdminWrapper>
  );
};
export default SysAdmin;
