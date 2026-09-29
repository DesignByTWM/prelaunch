"use client";

import { useEditState, useFormValue, type InputProps } from "sanity";

/**
 * LockedWhenPublished
 *
 * Renders the normal input, but read only once a published version of the
 * document exists. Used on page addresses: a draft can still change its
 * address freely, a published page cannot, because that would break every
 * link already pointing at it.
 */
export function LockedWhenPublished(props: InputProps) {
  const id = useFormValue(["_id"]) as string | undefined;
  const type = useFormValue(["_type"]) as string | undefined;
  const publishedId = (id ?? "").replace(/^drafts\./, "");
  const { published } = useEditState(publishedId, type ?? "");

  return props.renderDefault({
    ...props,
    readOnly: props.readOnly || Boolean(published),
  } as InputProps);
}
