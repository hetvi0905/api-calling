'use client';
import { useState } from 'react';

// import { useEffect } from 'react';
import {
  useRouter,
  useSearchParams,
  usePathname,
  ReadonlyURLSearchParams,
} from 'next/navigation';

interface tabArr {
  name: string;
  value: string;
}

export function useTabParams(tabs: tabArr[], tabName: string) {
  const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [curTab, setCurTab] = useState(
    searchParams?.get(tabName) ?? tabs[0]?.name
  );
  const objName = tabs?.map((obj) => obj.name);

  const isParams = objName?.includes(searchParams?.get(tabName) ?? '');
  const defaultValue = !objName?.includes(searchParams?.get(tabName) ?? '')
    ? tabs[0]?.name
    : searchParams?.get(tabName) ?? tabs[0]?.name;

  // useEffect(() => {
  //   if (!isParams) {
  //     router.push(`${pathname}?${tabName}=${tabs[0]}`);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleTabs = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const params = new URLSearchParams();
    console.log(target.id);
    if (target?.textContent) {
      setCurTab(target?.id);
      params?.set(tabName, target?.id);
    }

    console.log(params);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { handleTabs, isParams, defaultValue, curTab };
}
