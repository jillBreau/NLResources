import React, { useState } from 'react'
import clsx from 'clsx'
import { GetStaticProps } from 'next/types'
import Router from 'next/router'
import prisma from '../lib/prisma'
import { Type, Location, Format, Gender, Status, Organization } from '@prisma/client'

export interface OrganizationsProps {
  organizations: Organization[]
}

export const getStaticProps: GetStaticProps<OrganizationsProps> = async () => {
  const organizations: Organization[] = await prisma.organization.findMany({
    select: { name: true, id: true },
  })
  return {
    props: { organizations },
    revalidate: 10,
  }
}

const Submit: React.FC = (props: OrganizationsProps) => {
  const [submittedResource, setSubmittedResource] = useState('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [location, setLocation] = useState<Location>()
  const [format, setFormat] = useState<Format[]>([])
  const [organizationId, setOrganizationId] = useState<string>('')
  const [volunteerUpperAge, setVolunteerUpperAge] = useState<number>()
  const [volunteerLowerAge, setVolunteerLowerAge] = useState<number>()
  const [volunteerGenders, setVolunteerGenders] = useState<Gender[]>([])
  const [volunteerStatus, setVolunteerStatus] = useState<Status[]>([])
  const [participantUpperAge, setParticipantUpperAge] = useState<number>()
  const [participantLowerAge, setParticipantLowerAge] = useState<number>()
  const [participantGenders, setParticipantGenders] = useState<Gender[]>([])
  const [participantStatus, setParticipantStatus] = useState<Status[]>([])

  const canSubmit = () => {
    return (
      !!title && 
      !!description && 
      !!website && 
      !!location && 
      !!format.length && 
      !!organizationId && 
      !!volunteerGenders.length && 
      !!participantGenders.length
    )
  }

  const resetValues = () => {
    setTitle('')
    setDescription('')
    setWebsite('')
    setLocation(undefined)
    setFormat([])
    setOrganizationId('')
    setVolunteerUpperAge(undefined)
    setVolunteerLowerAge(undefined)
    setVolunteerGenders([])
    setVolunteerStatus([])
    setParticipantUpperAge(undefined)
    setParticipantLowerAge(undefined)
    setParticipantGenders([])
    setParticipantStatus([])
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = {
        type: Type.MENTORSHIP,
        title,
        description,
        website,
        location,
        format,
        organizationId,
        volunteerUpperAge,
        volunteerLowerAge,
        volunteerGenders,
        participantUpperAge,
        participantLowerAge,
        participantGenders,
        participantStatus,
        volunteerStatus,
      }
      const resource = await fetch('/api/resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(res => { return res.json()})
      setSubmittedResource(resource.title)
      resetValues()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      {submittedResource
        ? <>
          <span>{`${submittedResource} has been submitted`}</span>
          <button onClick={() => setSubmittedResource('')}>Submit another</button>
          </>
        : (
          <>
            <h1 className="p-2 font-mono">
              Submitting mentorship resource :D
            </h1>
            {/* TODO: add non-required inputs */}

            <form onSubmit={submitData} className="flex flex-col">
              <input
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                type="text"
                value={title}
              />
              <textarea
                cols={50}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={8}
                value={description}
              />
              {/* TODO: accommodate for this being an email address */}
              <input
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
                type="text"
                value={website}
              />
              {/* TODO: make some selects multi-selects */}
              <select
                name="Location"
                id="location"
                onChange={(e) => setLocation(e.target.value as Location)}
                value={location}
                defaultValue={''}
              >
                <option hidden disabled value={''}> Select a location </option>
                {Object.values(Location).map((locationOption) => {
                  return <option value={locationOption} key={locationOption}>{locationOption}</option>
                })}
              </select>
              <select
                name="Format"
                id="format"
                onChange={(e) => setFormat([e.target.value as Format])}
                value={format[0]}
                defaultValue={''}
              >
                <option hidden disabled value={''}> Select a format </option>
                {Object.values(Format).map((formatOption) => {
                  return <option value={formatOption} key={formatOption}>{formatOption}</option>
                })}
              </select>
              {/* TODO: add ability to add a new organization */}
              <select
                name="Organization"
                id="organization"
                onChange={(e) => setOrganizationId(e.target.value)}
                value={organizationId}
                defaultValue={''}
              >
                <option hidden disabled value={''}> Select an organization </option>
                {props.organizations.map((organizationOption) => {
                  return <option value={organizationOption.id} key={organizationOption.id}>{organizationOption.name}</option>
                })}
              </select>
              <select
                name="Volunteer Genders"
                id="volunteerGenders"
                onChange={(e) => setVolunteerGenders([e.target.value as Gender])}
                value={volunteerGenders[0]}
                defaultValue={''}
              >
                <option hidden disabled value={''}> Select a gender </option>
                {Object.values(Gender).map((genderOption) => {
                  return <option value={genderOption} key={genderOption}>{genderOption}</option>
                })}
              </select>
              <select
                name="Participant Genders"
                id="participantGenders"
                onChange={(e) => setParticipantGenders([e.target.value as Gender])}
                value={participantGenders[0]}
                defaultValue={''}
              >
                <option hidden disabled value={''}> Select a gender </option>
                {Object.values(Gender).map((genderOption) => {
                  return <option value={genderOption} key={genderOption}>{genderOption}</option>
                })}
              </select>
              <button
                disabled={!canSubmit()}
                className={clsx('bg-gray-200', {
                  '!bg-green-200': canSubmit()
                })}
                type="submit"
              >
                Submit for review
              </button>
              <a href="#" onClick={() => Router.push('/')} className="bg-yellow-200">
                Back to resources
              </a>
            </form>
          </>
        )
      }
    </div>
  )
}

export default Submit