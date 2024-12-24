import { AddToCollection } from '@extensions/components/AddToCollection';
import React, { useMemo, useState } from 'react';

export function useAddToCollection() {
  const [modalVisible, setModalVisible] = useState(false);
  const modal = useMemo(
    () =>
      modalVisible ? (
        <AddToCollection
          visible={modalVisible}
          setVisible={setModalVisible}
        />
      ) : null,
    [modalVisible],
  );

  return {
    modal,
    modalVisible,
    setModalVisible,
  };
}
