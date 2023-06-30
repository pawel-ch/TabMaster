import { Fragment, VFC } from "react";
import { FilterType, TabFilterSettings } from "./Filters";

type FilterPreviewProps<T extends FilterType> = {
  filter: TabFilterSettings<T>,
}


const CollectionFilterPreview: VFC<FilterPreviewProps<'collection'>> = ({ filter }) => {
  return <div className="merge-filter-entry">collection - {filter.params.collection}</div>
}

const InstalledFilterPreview: VFC<FilterPreviewProps<'installed'>> = ({filter }) => {
  return <div className="merge-filter-entry">installed - {filter.params.installed ? "yes" : "no"}</div>
}

const RegexFilterPreview: VFC<FilterPreviewProps<'regex'>> = ({ filter }) => {
  return <div className="merge-filter-entry">regex - {filter.params.regex}</div>
}

const FriendsFilterPreview: VFC<FilterPreviewProps<'friends'>> = ({ filter }) => {
  return <div className="merge-filter-entry">friends - {filter.params.friends.length} {filter.params.friends.length == 1 ? "friend" : "friends"}</div>
}

const TagsFilterPreview: VFC<FilterPreviewProps<'tags'>> = ({ filter }) => {
  return <div className="merge-filter-entry">tags - {filter.params.tags.length} {filter.params.tags.length == 1 ? "tag" : "tags"}</div>
}

const WhitelistFilterPreview: VFC<FilterPreviewProps<'whitelist'>> = ({ filter }) => {
  return <div className="merge-filter-entry">whitelist - {filter.params.games.length} whitelisted</div>
}

const BlackListFilterPreview: VFC<FilterPreviewProps<'blacklist'>> = ({ filter }) => {
  return <div className="merge-filter-entry">blacklist - {filter.params.games.length} blacklisted</div>
}

const MergeFilterPreview: VFC<FilterPreviewProps<'merge'>> = ({ filter }) => {
  return <div className="merge-filter-entry">merge - {filter.params.filters.length} grouped filters</div>
}

/**
 * Generates the preview data for filters in a merge group.
 */
export const FilterPreview: VFC<FilterPreviewProps<FilterType>> = ({ filter }) => {
  if (filter) {
    switch (filter.type) {
      case "collection":
        return <CollectionFilterPreview filter={filter as TabFilterSettings<'collection'>} />
      case "installed":
        return <InstalledFilterPreview filter={filter as TabFilterSettings<'installed'>} />
      case "regex":
        return <RegexFilterPreview filter={filter as TabFilterSettings<'regex'>} />
      case "friends":
        return <FriendsFilterPreview filter={filter as TabFilterSettings<'friends'>} />
      case "tags":
        return <TagsFilterPreview filter={filter as TabFilterSettings<'tags'>} />
      case "whitelist":
        return <WhitelistFilterPreview filter={filter as TabFilterSettings<'whitelist'>} />
      case "blacklist":
        return <BlackListFilterPreview filter={filter as TabFilterSettings<'blacklist'>} />
      case "merge":
        return <MergeFilterPreview filter={filter as TabFilterSettings<'merge'>} />
      default:
        return <Fragment />
    }
  } else {
    return <Fragment />
  }
}