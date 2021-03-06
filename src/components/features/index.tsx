import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  features: Array<{ title: string; text: string }>
}

export const Features: FunctionComponent<Props> = ({ features }) => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col sm:flex-row justify-between my-6 sm:my-0 px-6 sm:px-0'>
      {features.map((feature, index) => {
        return (
          <section
            className='flex flex-col w-full sm:w-1/3 px-0 sm:px-4 md:px-10 my-2 sm:my-8 '
            key={index}
          >
            <h3 className='text-2xl my-2 font-light'>{t(feature.title)}</h3>
            <p className='leading-loose'>{t(feature.text)}</p>
          </section>
        )
      })}
    </div>
  )
}
