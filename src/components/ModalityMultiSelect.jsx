
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import {useContext} from 'react';
import { DatasetContext } from '../context/DatasetContext';

export default function ModalityMultiSelect() {
    const { selectedModalities, setSelectedModalities, modalities } = useContext(DatasetContext);

    const toggleModality = (modality) => {
        if (selectedModalities.includes(modality)) {
            setSelectedModalities(selectedModalities.filter((m) => m !== modality));
        } else {
            setSelectedModalities([...selectedModalities, modality]);
        }
    };

    return (
        <div className="w-72">
        <Listbox value={selectedModalities} onChange={() => {}}>
            <div className="relative">
            <Listbox.Button className="w-full rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                {selectedModalities.length > 0
                ? selectedModalities.join(', ')
                : 'Select Modalities'}
                <ChevronDownIcon className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {modalities.map((modality) => (
                <Listbox.Option
                    key={modality}
                    value={modality}
                    as="div"
                    onClick={() => toggleModality(modality)}
                    className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                        active ? 'bg-blue-100' : ''
                    }`
                    }
                >
                    <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedModalities.includes(modality)}
                        onChange={() => toggleModality(modality)}
                        className="mr-3 h-4 w-4 text-[var(--color-primary)]"
                    />
                    <span className="text-gray-700">{modality}</span>
                    </div>
                </Listbox.Option>
                ))}
            </Listbox.Options>
            </div>
        </Listbox>
        </div>
  );
}
