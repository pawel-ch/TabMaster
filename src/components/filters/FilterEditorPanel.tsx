import { PanelSection, PanelSectionRow, Field, ButtonItem, Dropdown } from "decky-frontend-lib"
import { VFC, Fragment } from "react"
import { FilterEntry } from "./FilterEntry"
import { FilterOptions } from "./FilterOptions"
import { TabFilterSettings, FilterType } from "./Filters"
import { FilterSectionAccordion } from "../utils/Accordion"

interface FilterEditorPanelProps {
  groupFilters: TabFilterSettings<FilterType>[]
  groupLogicMode: string
  setGroupFilters: React.Dispatch<React.SetStateAction<TabFilterSettings<FilterType>[]>>
  setGroupLogicMode: React.Dispatch<React.SetStateAction<LogicalMode>>
  addFilter: () => void
  canAddFilter: boolean
}

export const FilterEditorPanel: VFC<FilterEditorPanelProps> = ({ groupFilters, groupLogicMode, setGroupFilters, setGroupLogicMode, addFilter, canAddFilter }) => {
  const modeOptions = [
    { label: "And", data: "and" },
    { label: "Or", data: "or" }
  ];

  return (
    <PanelSection title="Filters">
      <PanelSectionRow>
        <Field
          label="Group Combination Logic"
          childrenLayout="inline"
          childrenContainerWidth="min"
          inlineWrap="keep-inline"
          className="filter-input"
        >
          <div style={{ width: "150px" }}>
            <Dropdown rgOptions={modeOptions} selectedOption={groupLogicMode} onChange={(option) => setGroupLogicMode(option.data)} focusable={true} />
          </div>
        </Field>
      </PanelSectionRow>
      <PanelSectionRow>
        {groupFilters.map((filter, index) => {
          return (
            <>
              <FilterSectionAccordion
                index={index}
                filter={filter}
                isOpen={true}
              >
                <div className="filter-input">
                  <Field
                    label="Filter Type"
                    // TODO: need a way to set this to false when accordion is closed
                    focusable={true}
                    description={<FilterEntry index={index} filter={filter} containingGroupFilters={groupFilters} setContainingGroupFilters={setGroupFilters} />}
                  />
                </div>
                <div className="filter-input" key={`${filter.type}`}>
                  // TODO: need a way to set all focusable props in this component to false when accordion is closed
                  <FilterOptions index={index} filter={filter} containingGroupFilters={groupFilters} setContainingGroupFilters={setGroupFilters} />
                </div>
              </FilterSectionAccordion>
              {index == groupFilters.length - 1 ? (
                <div className="filter-start-cont" style={{ marginTop: "8px" }}>
                  <div className="filter-line" />
                </div>
              ) : (
                <Fragment />
              )}
            </>
          );
        })}
      </PanelSectionRow>
      <PanelSectionRow>
        <div className="styled-btn filter-input">
          {!canAddFilter ? (
            <div style={{ marginTop: "10px" }}>Please finish the current filter before adding another</div>
          ) : (
            <Fragment />
          )}
          <ButtonItem onClick={addFilter} disabled={!canAddFilter}>
            Add Filter
          </ButtonItem>
        </div>
      </PanelSectionRow>
    </PanelSection>
  )
}